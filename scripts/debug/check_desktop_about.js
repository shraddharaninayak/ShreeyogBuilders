const CDP = require('./cdp_helper.js');

async function checkDesktop() {
  const cdp = new CDP(9265);
  try {
    await cdp.connect('http://localhost:3000/about');
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false
    });
    await new Promise(r => setTimeout(r, 1500));

    const info = await cdp.eval(`(() => {
      const l1 = document.querySelector('.c-welcome .-w span.line-1');
      const l2 = document.querySelector('.c-welcome .-w span.line-2');
      const l3 = document.querySelector('.c-welcome .-w span.line-3');
      const fig = document.querySelector('.c-welcome > figure');
      const welcome = document.querySelector('.c-welcome');
      const w = document.querySelector('.c-welcome .-w');

      function b(el) {
        if (!el) return null;
        const r = el.getBoundingClientRect();
        const s = window.getComputedStyle(el);
        return {
          text: el.textContent.trim(),
          top: Math.round(r.top),
          bottom: Math.round(r.bottom),
          left: Math.round(r.left),
          right: Math.round(r.right),
          width: Math.round(r.width),
          height: Math.round(r.height),
          display: s.display,
          zIndex: s.zIndex,
          position: s.position,
          fontSize: s.fontSize,
          lineHeight: s.lineHeight,
          transform: s.transform
        };
      }

      return {
        welcome: b(welcome),
        w: b(w),
        line1: b(l1),
        line2: b(l2),
        line3: b(l3),
        fig: b(fig)
      };
    })()`);

    console.log(JSON.stringify(info, null, 2));
  } finally {
    await cdp.close();
  }
}

checkDesktop();
