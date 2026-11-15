const CDP = require('./cdp_helper.js');

async function findNonTransparent() {
  const cdp = new CDP(9272);
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

    const list = await cdp.eval(`(() => {
      return Array.from(document.querySelectorAll('*')).map(el => {
        const cs = window.getComputedStyle(el);
        const r = el.getBoundingClientRect();
        return {
          tag: el.tagName,
          className: el.className,
          id: el.id,
          rect: { top: Math.round(r.top), bottom: Math.round(r.bottom), left: Math.round(r.left), width: Math.round(r.width), height: Math.round(r.height) },
          bg: cs.backgroundColor,
          bgImg: cs.backgroundImage !== 'none' ? cs.backgroundImage.slice(0, 60) : 'none',
          opacity: cs.opacity,
          position: cs.position,
          zIndex: cs.zIndex
        };
      }).filter(d => {
        // filter elements with background color or image
        return (d.bg !== 'rgba(0, 0, 0, 0)' || d.bgImg !== 'none') &&
               d.rect.top < 844 && d.rect.bottom > 0 && d.rect.width > 50;
      });
    })()`);

    console.log('NON-TRANSPARENT ELEMENTS:');
    console.log(JSON.stringify(list, null, 2));

  } finally {
    await cdp.close();
  }
}

findNonTransparent();
