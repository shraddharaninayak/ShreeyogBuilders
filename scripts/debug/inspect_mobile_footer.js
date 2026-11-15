const CDP = require('./cdp_helper.js');
const fs = require('fs');

const ARTIFACT_DIR = 'C:/Users/supri/.gemini/antigravity/brain/052d3503-3ffa-4c2b-b51f-0571d6a9d35d';

async function inspectMobileFooter() {
  const cdp = new CDP(9250);
  try {
    console.log('Connecting to http://localhost:3000/ at 390x844 mobile viewport...');
    // We will resize via Emulation
    await cdp.connect('http://localhost:3000/');

    // Emulate iPhone / Mobile screen
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true
    });

    // Wait for page to be ready
    for (let i = 0; i < 30; i++) {
      const ready = await cdp.eval(`!!(document.documentElement && document.documentElement.classList.contains('-ready'))`);
      if (ready) break;
      await new Promise(r => setTimeout(r, 200));
    }
    await new Promise(r => setTimeout(r, 2000));

    // Scroll to footer
    await cdp.eval('window.scrollTo(0, document.documentElement.scrollHeight)');
    await new Promise(r => setTimeout(r, 1500));

    // Take screenshot of mobile footer
    await cdp.screenshot(`${ARTIFACT_DIR}/mobile_footer_current_raw.png`);
    console.log('Saved mobile_footer_current_raw.png');

    // Get element metrics
    const metrics = await cdp.eval(`(() => {
      const footer = document.querySelector('footer.page-footer');
      const block = document.querySelector('footer .-w.block');
      const after = document.querySelector('footer .-w.after');
      const logoLink = document.querySelector('footer .-w.after a.-nl');
      const logo = document.querySelector('footer .-w.after .footer-shreeyog-brand-logo');
      const ip1 = document.querySelector('footer .-w.after .ip-1');
      const title = document.querySelector('footer .-w.after .footer-shreeyog-title');
      const sub = document.querySelector('footer .-w.after .footer-shreeyog-sub');
      const desc = document.querySelector('footer .-w.after .footer-shreeyog-desc');
      const ip2 = document.querySelector('footer .-w.after .ip-2');
      const stone3 = document.querySelector('footer .stone-3');
      const stone3Img = document.querySelector('footer .stone-3 img');

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
          position: cs.position,
          display: cs.display,
          transform: cs.transform,
          margin: cs.margin,
          padding: cs.padding
        };
      }

      return {
        scrollY: window.scrollY,
        footer: b(footer),
        block: b(block),
        after: b(after),
        logoLink: b(logoLink),
        logo: b(logo),
        ip1: b(ip1),
        title: b(title),
        sub: b(sub),
        desc: b(desc),
        ip2: b(ip2),
        stone3: b(stone3),
        stone3Img: b(stone3Img)
      };
    })()`);

    console.log('=== MOBILE FOOTER METRICS ===');
    console.log(JSON.stringify(metrics, null, 2));

  } catch (err) {
    console.error('Error:', err);
  } finally {
    await cdp.close();
  }
}

inspectMobileFooter();
