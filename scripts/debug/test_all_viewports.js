const CDP = require('./cdp_helper.js');

const ARTIFACT_DIR = 'C:/Users/supri/.gemini/antigravity/brain/ff998ab5-1a3d-42c3-84d4-6774c67af56b';

async function testAllViewports() {
  const cdp = new CDP(9233);
  try {
    await cdp.connect('http://localhost:3000/');

    async function checkViewport(width, height, label) {
      console.log(`\n==============================================`);
      console.log(`CHECKING VIEWPORT: ${label} (${width}x${height})`);
      console.log(`==============================================`);
      
      await cdp.send('Emulation.setDeviceMetricsOverride', {
        width: width,
        height: height,
        deviceScaleFactor: 2,
        mobile: width < 768
      });
      await new Promise(r => setTimeout(r, 2000));

      const metrics = await cdp.eval(`(() => {
        const l1 = document.querySelector('.c-welcome .-w span.line-1');
        const l2 = document.querySelector('.c-welcome .-w span.line-2');
        const l3 = document.querySelector('.c-welcome .-w span.line-3');
        const l1m = document.querySelector('.c-welcome .-w .line-1-m');
        const l2m = document.querySelector('.c-welcome .-w .line-2-m');
        const cta = document.querySelector('.c-welcome .-w .cta');
        const stone = document.querySelector('.c-welcome .-w .stone');

        function b(el) {
          if (!el) return null;
          const r = el.getBoundingClientRect();
          return {
            top: Math.round(r.top),
            left: Math.round(r.left),
            right: Math.round(r.right),
            bottom: Math.round(r.bottom),
            width: Math.round(r.width),
            height: Math.round(r.height)
          };
        }

        function overlaps(a, b) {
          if (!a || !b) return false;
          return !(a.right <= b.left || a.left >= b.right || a.bottom <= b.top || a.top >= b.bottom);
        }

        const b1 = b(l1), b2 = b(l2), b3 = b(l3), bm1 = b(l1m), bm2 = b(l2m), bcta = b(cta);

        return {
          l1: b1,
          l2: b2,
          l3: b3,
          l1m: bm1,
          l2m: bm2,
          cta: bcta,
          overlaps: {
            'l1 vs l1m': overlaps(b1, bm1),
            'l2 vs l1m': overlaps(b2, bm1),
            'l3 vs l1m': overlaps(b3, bm1),
            'l1 vs l2m': overlaps(b1, bm2),
            'l2 vs l2m': overlaps(b2, bm2),
            'l3 vs l2m': overlaps(b3, bm2),
            'l2m vs cta': overlaps(bm2, bcta)
          }
        };
      })()`);

      console.log('Metrics:', JSON.stringify(metrics, null, 2));
      await cdp.screenshot(`${ARTIFACT_DIR}/verify_${label.toLowerCase().replace(/\\s+/g, '_')}.png`);
      console.log(`Saved verify_${label.toLowerCase().replace(/\\s+/g, '_')}.png`);
      
      const anyOverlap = Object.values(metrics.overlaps).some(v => v === true);
      console.log(`ANY OVERLAP DETECTED IN ${label}?`, anyOverlap ? 'YES (FAIL)' : 'NO (PERFECT ✓)');
      return !anyOverlap;
    }

    // 1. Desktop 1440x900
    const dOk = await checkViewport(1440, 900, 'Desktop 1440');

    // 2. Tablet 1024x768
    const tOk = await checkViewport(1024, 768, 'Tablet 1024');

    // 3. Mobile 390x844 (iPhone 14)
    const mOk = await checkViewport(390, 844, 'Mobile 390');

    console.log('\n==============================================');
    console.log('ALL VIEWPORTS SUMMARY:');
    console.log('Desktop 1440:', dOk ? 'PASS ✓' : 'FAIL');
    console.log('Tablet 1024:', tOk ? 'PASS ✓' : 'FAIL');
    console.log('Mobile 390:', mOk ? 'PASS ✓' : 'FAIL');
    console.log('==============================================');

  } finally {
    await cdp.close();
  }
}

testAllViewports().catch(console.error);
