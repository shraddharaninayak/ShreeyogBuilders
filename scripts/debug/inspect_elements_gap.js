const CDP = require('./cdp_helper.js');

async function inspectElementsInGap() {
  const cdp = new CDP(9269);
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

    const els = await cdp.eval(`(() => {
      return Array.from(document.querySelectorAll('.c-brief *')).map(el => {
        const r = el.getBoundingClientRect();
        const cs = window.getComputedStyle(el);
        return {
          tag: el.tagName,
          class: el.className,
          text: el.children.length === 0 ? el.textContent.trim().slice(0, 30) : null,
          rect: { top: Math.round(r.top), bottom: Math.round(r.bottom), left: Math.round(r.left), right: Math.round(r.right), width: Math.round(r.width), height: Math.round(r.height) },
          display: cs.display,
          transform: cs.transform,
          bg: cs.backgroundColor,
          color: cs.color
        };
      });
    })()`);

    console.log('BRIEF CHILDREN:');
    console.log(JSON.stringify(els, null, 2));

  } finally {
    await cdp.close();
  }
}

inspectElementsInGap();
