const CDP = require('./cdp_helper.js');

async function findRawBlackBox() {
  const cdp = new CDP(9271);
  try {
    await cdp.connect('http://localhost:3000/about');
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true
    });
    await new Promise(r => setTimeout(r, 2000));
    await cdp.eval('window.scrollTo(0, 400)');
    await new Promise(r => setTimeout(r, 600));

    // Check what is at (195, 550) on screen
    const info = await cdp.eval(`(() => {
      const el = document.elementFromPoint(195, 550);
      function dump(node) {
        if (!node) return null;
        const cs = window.getComputedStyle(node);
        const r = node.getBoundingClientRect();
        return {
          tag: node.tagName,
          className: node.className,
          id: node.id,
          rect: { top: Math.round(r.top), bottom: Math.round(r.bottom), left: Math.round(r.left), width: Math.round(r.width), height: Math.round(r.height) },
          bg: cs.backgroundColor,
          bgImg: cs.backgroundImage ? cs.backgroundImage.slice(0, 50) : 'none',
          color: cs.color,
          outer: node.outerHTML ? node.outerHTML.slice(0, 200) : ''
        };
      }

      // Check all elements overlapping this rectangle
      const all = Array.from(document.querySelectorAll('*')).map(dump).filter(d => {
        return d && d.rect.top <= 550 && d.rect.bottom >= 550 && d.rect.height > 20;
      });

      return {
        fromPoint: dump(el),
        overlapping: all
      };
    })()`);

    console.log('RAW BLACK BOX DETAILS:');
    console.log(JSON.stringify(info, null, 2));

  } finally {
    await cdp.close();
  }
}

findRawBlackBox();
