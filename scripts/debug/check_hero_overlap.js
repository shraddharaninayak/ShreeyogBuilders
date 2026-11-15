const CDP = require('./cdp_helper.js');

const ARTIFACT_DIR = 'C:/Users/supri/.gemini/antigravity/brain/ff998ab5-1a3d-42c3-84d4-6774c67af56b';

async function checkOverlap() {
  const cdp = new CDP(9233);
  try {
    await cdp.connect('http://localhost:3000/');
    await new Promise(r => setTimeout(r, 2500));

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

      const b1 = b(l1), b2 = b(l2), b3 = b(l3), bm1 = b(l1m), bm2 = b(l2m);

      return {
        l1: b1,
        l2: b2,
        l3: b3,
        l1m: bm1,
        l2m: bm2,
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

    console.log('Hero Overlap Check:');
    console.log(JSON.stringify(metrics, null, 2));

    await cdp.screenshot(`${ARTIFACT_DIR}/verified_hero_no_overlap_desktop.png`);
    console.log('Saved verified_hero_no_overlap_desktop.png');

  } finally {
    await cdp.close();
  }
}

checkOverlap().catch(console.error);
