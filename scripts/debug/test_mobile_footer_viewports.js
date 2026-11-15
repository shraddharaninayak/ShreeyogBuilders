const CDP = require('./cdp_helper.js');
const fs = require('fs');

const ARTIFACT_DIR = 'C:/Users/supri/.gemini/antigravity/brain/052d3503-3ffa-4c2b-b51f-0571d6a9d35d';

const viewports = [
  { name: '360_small_android', width: 360, height: 740, mobile: true },
  { name: '390_iphone_14', width: 390, height: 844, mobile: true },
  { name: '430_iphone_promax', width: 430, height: 932, mobile: true },
  { name: '768_tablet_portrait', width: 768, height: 1024, mobile: true },
  { name: '1440_desktop_check', width: 1440, height: 900, mobile: false }
];

async function runViewportTests() {
  const cdp = new CDP(9255);
  try {
    console.log('Connecting to http://localhost:3000/ ...');
    await cdp.connect('http://localhost:3000/');

    for (const vp of viewports) {
      console.log(`\n==============================================`);
      console.log(`TESTING VIEWPORT: ${vp.name} (${vp.width}x${vp.height})`);
      console.log(`==============================================`);

      await cdp.send('Emulation.setDeviceMetricsOverride', {
        width: vp.width,
        height: vp.height,
        deviceScaleFactor: 2,
        mobile: vp.mobile
      });

      // Reload to ensure all media queries and responsive scripts calculate clean
      await cdp.eval('location.reload()');
      await new Promise(r => setTimeout(r, 3500));

      // Dismiss cookie banner
      await cdp.eval(`(() => {
        const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Accept'));
        if (btn) btn.click();
      })()`);
      await new Promise(r => setTimeout(r, 400));

      // Scroll to footer
      await cdp.eval(`(() => {
        const after = document.querySelector('footer .-w.after');
        if (after) {
          after.scrollIntoView({ behavior: 'instant', block: 'start' });
        } else {
          window.scrollTo(0, document.documentElement.scrollHeight);
        }
      })()`);
      await new Promise(r => setTimeout(r, 1000));

      // Capture screenshot
      const shotPath = `${ARTIFACT_DIR}/footer_viewport_${vp.name}.png`;
      await cdp.screenshot(shotPath);
      console.log(`Saved screenshot: footer_viewport_${vp.name}.png`);

      // Inspect layout metrics
      const metrics = await cdp.eval(`(() => {
        const vpW = window.innerWidth;
        const vpH = window.innerHeight;
        const footer = document.querySelector('footer.page-footer');
        const after = document.querySelector('footer .-w.after');
        const logo = document.querySelector('footer .-w.after .footer-shreeyog-brand-logo');
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
            transform: cs.transform
          };
        }

        function overlaps(a, b) {
          if (!a || !b) return false;
          return !(a.right <= b.left || a.left >= b.right || a.bottom <= b.top || a.top >= b.bottom);
        }

        const bl = b(logo), bt = b(title), bsub = b(sub), bd = b(desc), b2 = b(ip2), bs = b(stone3);

        const clippedOnLeft = bs ? bs.left < 0 : false;
        const clippedOnRight = bs ? bs.right > vpW : false;
        const overlapsText = bs && b2 ? overlaps(bs, b2) : false;

        return {
          vpW,
          vpH,
          logo: bl,
          title: bt,
          sub: bsub,
          desc: bd,
          ip2: b2,
          stone3: bs,
          checks: {
            clippedOnLeft,
            clippedOnRight,
            overlapsText,
            stone3Transform: bs ? bs.transform : null
          }
        };
      })()`);

      console.log('Metrics summary:');
      console.log('Logo width:', metrics.logo?.width, 'left:', metrics.logo?.left);
      console.log('Text (ip-2) bottom:', metrics.ip2?.bottom, 'height:', metrics.ip2?.height);
      console.log('Stone3 top:', metrics.stone3?.top, 'width:', metrics.stone3?.width, 'left:', metrics.stone3?.left, 'right:', metrics.stone3?.right);
      console.log('Stone3 transform:', metrics.checks.stone3Transform);
      console.log('Stone3 clipped left?', metrics.checks.clippedOnLeft ? 'YES ✗' : 'NO ✓');
      console.log('Stone3 clipped right?', metrics.checks.clippedOnRight ? 'YES ✗' : 'NO ✓');
      console.log('Stone3 overlaps ip-2?', metrics.checks.overlapsText ? 'YES ✗' : 'NO ✓');
    }

    console.log('\n==============================================');
    console.log('ALL VIEWPORT TESTS COMPLETE!');
    console.log('==============================================');

  } catch (e) {
    console.error(e);
  } finally {
    await cdp.close();
  }
}

runViewportTests();
