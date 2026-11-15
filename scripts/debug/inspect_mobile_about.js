const CDP = require('./cdp_helper.js');
const fs = require('fs');

const ARTIFACT_DIR = 'C:/Users/supri/.gemini/antigravity/brain/052d3503-3ffa-4c2b-b51f-0571d6a9d35d';

async function inspectMobileAbout() {
  const cdp = new CDP(9260);
  try {
    console.log('Connecting to http://localhost:3000/about at 390x844...');
    await cdp.connect('http://localhost:3000/about');
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true
    });

    for (let i = 0; i < 40; i++) {
      const ready = await cdp.eval(`!!(document.documentElement && document.documentElement.classList.contains('-ready'))`);
      if (ready) break;
      await new Promise(r => setTimeout(r, 200));
    }
    await new Promise(r => setTimeout(r, 2000));

    // Dismiss cookie banner
    await cdp.eval(`(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Accept'));
      if (btn) btn.click();
    })()`);
    await new Promise(r => setTimeout(r, 500));

    // Capture initial top view
    await cdp.screenshot(`${ARTIFACT_DIR}/mobile_about_initial_top.png`);
    console.log('Saved mobile_about_initial_top.png');

    // Get metrics of hero and brief elements
    const metrics = await cdp.eval(`(() => {
      const welcome = document.querySelector('.c-welcome');
      const w = document.querySelector('.c-welcome .-w');
      const l1 = document.querySelector('.c-welcome .-w span.line-1');
      const l2 = document.querySelector('.c-welcome .-w span.line-2');
      const l3 = document.querySelector('.c-welcome .-w span.line-3');
      const fig = document.querySelector('.c-welcome > figure');
      const figImg = document.querySelector('.c-welcome > figure img');
      const brief = document.querySelector('.c-brief');
      const caption = document.querySelector('.c-brief .-w .caption');

      function b(el) {
        if (!el) return null;
        const r = el.getBoundingClientRect();
        const cs = window.getComputedStyle(el);
        return {
          top: Math.round(r.top),
          bottom: Math.round(r.bottom),
          left: Math.round(r.left),
          right: Math.round(r.right),
          width: Math.round(r.width),
          height: Math.round(r.height),
          display: cs.display,
          visibility: cs.visibility,
          opacity: cs.opacity,
          position: cs.position,
          transform: cs.transform,
          zIndex: cs.zIndex
        };
      }

      return {
        welcome: b(welcome),
        w: b(w),
        l1: b(l1),
        l2: b(l2),
        l3: b(l3),
        fig: b(fig),
        figImg: b(figImg),
        brief: b(brief),
        caption: b(caption)
      };
    })()`);

    console.log('=== ABOUT PAGE HERO & BRIEF METRICS ===');
    console.log(JSON.stringify(metrics, null, 2));

  } catch (err) {
    console.error(err);
  } finally {
    await cdp.close();
  }
}

inspectMobileAbout();
