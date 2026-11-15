const CDP = require('./cdp_helper.js');

const ARTIFACT_DIR = 'C:/Users/supri/.gemini/antigravity/brain/ff998ab5-1a3d-42c3-84d4-6774c67af56b';

async function testMobileOptions() {
  const cdp = new CDP(9233);
  try {
    await cdp.connect('http://localhost:3000/');
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true
    });
    await new Promise(r => setTimeout(r, 2000));

    await cdp.eval(`(() => {
      let st = document.getElementById('test-mobile-style');
      if (!st) {
        st = document.createElement('style');
        st.id = 'test-mobile-style';
        document.head.appendChild(st);
      }
      st.innerHTML = \`
        @media (max-width: 768px) {
          .c-welcome .-w span.line-1[data-v-6c6a6d99] {
            grid-column: 1 / -1 !important;
            grid-row: 1 / 2 !important;
            justify-self: center !important;
            text-align: center !important;
            font-size: clamp(28px, 7.8vw, 44px) !important;
          }
          .c-welcome .-w span.line-2[data-v-6c6a6d99] {
            grid-column: 1 / -1 !important;
            grid-row: 2 / 3 !important;
            justify-self: center !important;
            text-align: center !important;
            font-size: clamp(32px, 8.8vw, 50px) !important;
          }
          .c-welcome .-w span.line-3[data-v-6c6a6d99] {
            grid-column: 1 / -1 !important;
            grid-row: 3 / 4 !important;
            justify-self: center !important;
            text-align: center !important;
            font-size: clamp(36px, 9.8vw, 56px) !important;
          }
          .c-welcome .-w .line-1-m[data-v-6c6a6d99] {
            grid-column: 4 / -1 !important;
            grid-row: 1 / 2 !important;
            justify-self: end !important;
            text-align: right !important;
            font-size: 10px !important;
            margin-top: -12px !important;
            padding-right: 16px !important;
            z-index: 15 !important;
          }
          .c-welcome .-w .line-2-m[data-v-6c6a6d99] {
            grid-column: 1 / 4 !important;
            grid-row: 4 / 5 !important;
            justify-self: start !important;
            text-align: left !important;
            font-size: 10px !important;
            padding-left: 16px !important;
            margin-top: 14px !important;
            z-index: 15 !important;
          }
        }
      \`;
    })()`);

    await new Promise(r => setTimeout(r, 600));

    const check = await cdp.eval(`(() => {
      const l1 = document.querySelector('.c-welcome .-w span.line-1');
      const l2 = document.querySelector('.c-welcome .-w span.line-2');
      const l3 = document.querySelector('.c-welcome .-w span.line-3');
      const l1m = document.querySelector('.c-welcome .-w .line-1-m');
      const l2m = document.querySelector('.c-welcome .-w .line-2-m');

      function b(el) {
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return { top: Math.round(r.top), left: Math.round(r.left), right: Math.round(r.right), bottom: Math.round(r.bottom), width: Math.round(r.width), height: Math.round(r.height) };
      }

      function overlaps(a, b) {
        if (!a || !b) return false;
        return !(a.right <= b.left || a.left >= b.right || a.bottom <= b.top || a.top >= b.bottom);
      }

      const b1 = b(l1), b2 = b(l2), b3 = b(l3), bm1 = b(l1m), bm2 = b(l2m);

      return {
        l1: b1, l2: b2, l3: b3, l1m: bm1, l2m: bm2,
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

    console.log('Mobile Check Result:', JSON.stringify(check, null, 2));
    await cdp.screenshot(`${ARTIFACT_DIR}/verify_mobile_clean_editorial.png`);
    console.log('Saved verify_mobile_clean_editorial.png');

  } finally {
    await cdp.close();
  }
}

testMobileOptions().catch(console.error);
