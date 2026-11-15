const CDP = require('./cdp_helper.js');

async function debugDesktopCss() {
  const cdp = new CDP(9271);
  try {
    await cdp.connect('http://localhost:3000/about');
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false
    });
    await new Promise(r => setTimeout(r, 1000));

    const res = await cdp.eval(`(() => {
      const l1 = document.querySelector('.c-welcome .-w span.line-1');
      const l3 = document.querySelector('.c-welcome .-w span.line-3');
      const fig = document.querySelector('.c-welcome > figure');
      
      const s = document.createElement('style');
      s.textContent = \`
        html body .about-page .c-welcome .-w span.line-3 {
          display: none !important;
        }
      \`;
      document.head.appendChild(s);

      return {
        l3Display: window.getComputedStyle(l3).display
      };
    })()`);

    console.log(res);
  } finally {
    await cdp.close();
  }
}

debugDesktopCss();
