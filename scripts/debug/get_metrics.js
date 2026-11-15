const CDP = require('./cdp_helper.js');

async function getMetrics() {
  const cdp = new CDP(9273);
  try {
    await cdp.connect('http://localhost:3000/about');

    const runChecks = async (vpName, width, height, isMobile) => {
      await cdp.send('Emulation.setDeviceMetricsOverride', {
        width,
        height,
        deviceScaleFactor: isMobile ? 2 : 1,
        mobile: isMobile
      });
      await new Promise(r => setTimeout(r, 600));

      const m = await cdp.eval(`(() => {
        const l1 = document.querySelector('.c-welcome .-w span.line-1');
        const l2 = document.querySelector('.c-welcome .-w span.line-2');
        const l3 = document.querySelector('.c-welcome .-w span.line-3');
        const fig = document.querySelector('.c-welcome > figure');
        const brief = document.querySelector('.c-brief .-w .caption');

        function b(el) {
          if (!el) return null;
          const r = el.getBoundingClientRect();
          const s = window.getComputedStyle(el);
          return {
            text: el.textContent.trim(),
            display: s.display,
            top: Math.round(r.top),
            bottom: Math.round(r.bottom),
            left: Math.round(r.left),
            right: Math.round(r.right),
            width: Math.round(r.width),
            height: Math.round(r.height),
            fontSize: s.fontSize,
            lineHeight: s.lineHeight
          };
        }

        const b1 = b(l1), b2 = b(l2), b3 = b(l3), bf = b(fig), bc = b(brief);
        return {
          l1: b1,
          l2: b2,
          l3: b3,
          fig: bf,
          brief: bc,
          gapL1ToL2: b2 && b1 ? b2.top - b1.bottom : null,
          gapL2ToFig: bf && b2 ? bf.top - b2.bottom : null,
          gapFigToBrief: bc && bf ? bc.top - bf.bottom : null,
          hasHorizontalScroll: document.documentElement.scrollWidth > window.innerWidth + 1
        };
      })()`);

      console.log(`=== ${vpName} (${width}x${height}) ===`);
      console.log(JSON.stringify(m, null, 2));
    };

    await runChecks('Desktop 1440', 1440, 900, false);
    await runChecks('Tablet 768', 768, 1024, true);
    await runChecks('iPhone 390', 390, 844, true);
    await runChecks('Small Android 360', 360, 740, true);

  } finally {
    await cdp.close();
  }
}

getMetrics();
