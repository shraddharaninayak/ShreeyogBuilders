const CDP = require('./cdp_helper.js');

async function findBlackElements() {
  const cdp = new CDP(9268);
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

    const blackEls = await cdp.eval(`(() => {
      const all = Array.from(document.querySelectorAll('*'));
      return all.map(el => {
        const cs = window.getComputedStyle(el);
        const r = el.getBoundingClientRect();
        if (cs.backgroundColor.includes('rgb(0, 0, 0)') || cs.backgroundColor.includes('rgb(21, 20, 21)')) {
          if (r.width > 50 && r.height > 50 && r.top < 844 && r.bottom > 0) {
            return {
              tag: el.tagName,
              class: el.className,
              rect: { top: Math.round(r.top), bottom: Math.round(r.bottom), left: Math.round(r.left), width: Math.round(r.width), height: Math.round(r.height) },
              csBg: cs.backgroundColor,
              zIndex: cs.zIndex,
              position: cs.position
            };
          }
        }
        return null;
      }).filter(Boolean);
    })()`);

    console.log('VISIBLE BLACK ELEMENTS:');
    console.log(JSON.stringify(blackEls, null, 2));

  } finally {
    await cdp.close();
  }
}

findBlackElements();
