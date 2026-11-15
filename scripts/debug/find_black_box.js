const CDP = require('./cdp_helper.js');

async function findBlackBox() {
  const cdp = new CDP(9264);
  try {
    await cdp.connect('http://localhost:3000/about');
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true
    });
    await new Promise(r => setTimeout(r, 2000));

    // Scroll to brief
    await cdp.eval(`(() => {
      const brief = document.querySelector('.c-brief');
      if (brief) brief.scrollIntoView({ behavior: 'instant', block: 'start' });
    })()`);
    await new Promise(r => setTimeout(r, 600));

    const elements = await cdp.eval(`(() => {
      // Find all elements within viewport
      const els = Array.from(document.querySelectorAll('*')).map(el => {
        const r = el.getBoundingClientRect();
        const cs = window.getComputedStyle(el);
        if (r.top < 800 && r.bottom > 200 && r.width > 100 && r.height > 50) {
          return {
            tag: el.tagName,
            className: el.className,
            bg: cs.backgroundColor,
            bgImg: cs.backgroundImage ? cs.backgroundImage.slice(0, 60) : 'none',
            rect: { top: Math.round(r.top), bottom: Math.round(r.bottom), width: Math.round(r.width), height: Math.round(r.height) }
          };
        }
        return null;
      }).filter(Boolean);

      return elements = els.filter(e => e.bg.includes('rgb(0, 0, 0)') || e.bg.includes('rgb(21, 20, 21)') || e.bgImg.includes('gradient') || e.className.includes('figure-map') || e.className.includes('item'));
    })()`);

    console.log('BLACK BOX CANDIDATES:');
    console.log(JSON.stringify(elements, null, 2));

  } finally {
    await cdp.close();
  }
}

findBlackBox();
