const CDP = require('./cdp_helper.js');

const ARTIFACT_DIR = 'C:/Users/supri/.gemini/antigravity/brain/ff998ab5-1a3d-42c3-84d4-6774c67af56b';

async function testNewGrid() {
  const cdp = new CDP(9233);
  try {
    await cdp.connect('http://localhost:3000/');
    await new Promise(r => setTimeout(r, 2000));

    // Apply the clean grid rules dynamically
    await cdp.eval(`(() => {
      let st = document.getElementById('test-grid-override');
      if (!st) {
        st = document.createElement('style');
        st.id = 'test-grid-override';
        document.head.appendChild(st);
      }
      st.innerHTML = \`
        /* Desktop */
        @media (min-width: 1025px) {
          .c-welcome .-w .line-1-m[data-v-6c6a6d99] {
            grid-column: 9 / 12 !important;
            grid-row: 1 / 2 !important;
            justify-self: end !important;
            text-align: right !important;
            margin-top: calc(var(--h1) * 0.8) !important;
            padding-right: var(--g-gap) !important;
            z-index: 15 !important;
          }
          .c-welcome .-w .line-2-m[data-v-6c6a6d99] {
            grid-column: 2 / 5 !important;
            grid-row: 2 / 3 !important;
            justify-self: start !important;
            text-align: left !important;
            margin-top: calc(var(--h1) * 0.5) !important;
            padding-left: var(--g-gap) !important;
            z-index: 15 !important;
          }
        }
        /* Tablet & Mobile */
        @media (max-width: 1024px) {
          .c-welcome .-w .line-1-m[data-v-6c6a6d99] {
            grid-column: 4 / 7 !important;
            grid-row: 1 / 2 !important;
            justify-self: end !important;
            text-align: right !important;
            margin-top: 10px !important;
            font-size: 10px !important;
            z-index: 15 !important;
          }
          .c-welcome .-w .line-2-m[data-v-6c6a6d99] {
            grid-column: 1 / 4 !important;
            grid-row: 2 / 3 !important;
            justify-self: start !important;
            text-align: left !important;
            margin-top: 20px !important;
            font-size: 10px !important;
            z-index: 15 !important;
          }
        }
      \`;
    })()`);

    await new Promise(r => setTimeout(r, 500));

    // Capture initial screenshot
    await cdp.screenshot(`${ARTIFACT_DIR}/preview_clean_grid_desktop.png`);
    console.log('Saved preview_clean_grid_desktop.png');

    // Check positions
    const metrics = await cdp.eval(`(() => {
      const l1 = document.querySelector('.c-welcome .-w span.line-1');
      const l2 = document.querySelector('.c-welcome .-w span.line-2');
      const l3 = document.querySelector('.c-welcome .-w span.line-3');
      const l1m = document.querySelector('.c-welcome .-w .line-1-m');
      const l2m = document.querySelector('.c-welcome .-w .line-2-m');

      function b(el) {
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return { top: Math.round(r.top), left: Math.round(r.left), right: Math.round(r.right), bottom: Math.round(r.bottom) };
      }

      function overlaps(a, b) {
        return !(a.right < b.left || a.left > b.right || a.bottom < b.top || a.top > b.bottom);
      }

      const b1 = b(l1), b2 = b(l2), b3 = b(l3), bm1 = b(l1m), bm2 = b(l2m);

      return {
        l1: b1, l2: b2, l3: b3, l1m: bm1, l2m: bm2,
        overlapsL1_L1m: overlaps(b1, bm1),
        overlapsL2_L2m: overlaps(b2, bm2),
        overlapsL3_L1m: overlaps(b3, bm1),
        overlapsL3_L2m: overlaps(b3, bm2)
      };
    })()`);

    console.log('Metrics with clean grid:');
    console.log(JSON.stringify(metrics, null, 2));

  } finally {
    await cdp.close();
  }
}

testNewGrid().catch(console.error);
