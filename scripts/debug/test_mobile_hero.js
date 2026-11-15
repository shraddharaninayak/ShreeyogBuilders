const CDP = require('./cdp_helper.js');

const ARTIFACT_DIR = 'C:/Users/supri/.gemini/antigravity/brain/ff998ab5-1a3d-42c3-84d4-6774c67af56b';

async function testMobileHero() {
  const cdp = new CDP(9233);
  try {
    await cdp.connect('http://localhost:3000/');
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true
    });
    await new Promise(r => setTimeout(r, 2500));

    const info = await cdp.eval(`(() => {
      const w = document.querySelector('.c-welcome .-w');
      const l1 = document.querySelector('.c-welcome .-w span.line-1');
      const l2 = document.querySelector('.c-welcome .-w span.line-2');
      const l3 = document.querySelector('.c-welcome .-w span.line-3');
      const l1m = document.querySelector('.c-welcome .-w .line-1-m');
      const l2m = document.querySelector('.c-welcome .-w .line-2-m');
      const stone = document.querySelector('.c-welcome .-w .stone');
      const logo = document.querySelector('.shreeyog-brand-logo');

      function b(el) {
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return { top: Math.round(r.top), left: Math.round(r.left), width: Math.round(r.width), height: Math.round(r.height) };
      }

      function overlaps(a, b) {
        if (!a || !b) return false;
        return !(a.left + a.width <= b.left || a.left >= b.left + b.width || a.top + a.height <= b.top || a.top >= b.top + b.height);
      }

      const b1 = b(l1), b2 = b(l2), b3 = b(l3), bm1 = b(l1m), bm2 = b(l2m);

      return {
        gridCols: w ? window.getComputedStyle(w).gridTemplateColumns : null,
        l1: b1,
        l2: b2,
        l3: b3,
        l1m: bm1,
        l2m: bm2,
        stone: b(stone),
        logo: b(logo),
        overlaps: {
          'l1 vs l1m': overlaps(b1, bm1),
          'l2 vs l1m': overlaps(b2, bm1),
          'l3 vs l1m': overlaps(b3, bm1),
          'l1 vs l2m': overlaps(b1, bm2),
          'l2 vs l2m': overlaps(b2, bm2),
          'l3 vs l2m': overlaps(b3, bm2)
        }
      };
    })()`);

    console.log('Mobile Hero Info:', JSON.stringify(info, null, 2));
    await cdp.screenshot(`${ARTIFACT_DIR}/verify_mobile_hero_initial.png`);
    console.log('Saved verify_mobile_hero_initial.png');

    // Scroll down 1500 and back to 0
    await cdp.eval('window.scrollTo(0, 1500)');
    await new Promise(r => setTimeout(r, 600));
    await cdp.eval('window.scrollTo(0, 0)');
    await new Promise(r => setTimeout(r, 800));

    const afterScroll = await cdp.eval(`(() => {
      const l1 = document.querySelector('.c-welcome .-w span.line-1');
      const l2 = document.querySelector('.c-welcome .-w span.line-2');
      const l3 = document.querySelector('.c-welcome .-w span.line-3');
      const l1m = document.querySelector('.c-welcome .-w .line-1-m');
      const l2m = document.querySelector('.c-welcome .-w .line-2-m');
      const stone = document.querySelector('.c-welcome .-w .stone');

      function b(el) {
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return { top: Math.round(r.top), left: Math.round(r.left), width: Math.round(r.width), height: Math.round(r.height) };
      }

      return {
        l1: b(l1),
        l2: b(l2),
        l3: b(l3),
        l1m: b(l1m),
        l2m: b(l2m),
        stone: b(stone)
      };
    })()`);

    console.log('Mobile After Scroll:', JSON.stringify(afterScroll, null, 2));
    await cdp.screenshot(`${ARTIFACT_DIR}/verify_mobile_hero_back_at_top.png`);
    console.log('Saved verify_mobile_hero_back_at_top.png');

  } finally {
    await cdp.close();
  }
}

testMobileHero().catch(console.error);
