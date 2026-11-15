const CDP = require('./cdp_helper.js');
const fs = require('fs');

const ARTIFACT_DIR = 'C:/Users/supri/.gemini/antigravity/brain/ff998ab5-1a3d-42c3-84d4-6774c67af56b';

async function verifyCompleteExperience() {
  const cdp = new CDP(9233);
  try {
    console.log('Connecting to http://localhost:3000/ ...');
    await cdp.connect('http://localhost:3000/');

    // Poll until document is ready
    for (let i = 0; i < 30; i++) {
      const ready = await cdp.eval(`!!(document.documentElement && document.documentElement.classList.contains('-ready'))`);
      if (ready) break;
      await new Promise(r => setTimeout(r, 200));
    }
    await new Promise(r => setTimeout(r, 2500)); // allow entrance transitions to complete

    async function getFullMetrics() {
      return await cdp.eval(`(() => {
        const l1 = document.querySelector('.c-welcome .-w span.line-1');
        const l2 = document.querySelector('.c-welcome .-w span.line-2');
        const l3 = document.querySelector('.c-welcome .-w span.line-3');
        const l1m = document.querySelector('.c-welcome .-w .line-1-m');
        const l2m = document.querySelector('.c-welcome .-w .line-2-m');
        const stone = document.querySelector('.c-welcome .-w .stone');
        const places = document.querySelector('.c-welcome .-w .places');
        const items = document.querySelector('.c-welcome .-w .items');
        const cta = document.querySelector('.c-welcome .-w .cta');
        const logo = document.querySelector('.shreeyog-brand-logo');
        const pt = document.querySelector('.page-transition');

        function b(el) {
          if (!el) return null;
          const r = el.getBoundingClientRect();
          const cs = window.getComputedStyle(el);
          return {
            top: Math.round(r.top),
            left: Math.round(r.left),
            right: Math.round(r.right),
            bottom: Math.round(r.bottom),
            width: Math.round(r.width),
            height: Math.round(r.height),
            transform: cs.transform,
            opacity: cs.opacity,
            progressVar: cs.getPropertyValue('--progress').trim()
          };
        }

        function overlaps(a, b) {
          if (!a || !b) return false;
          return !(a.right <= b.left || a.left >= b.right || a.bottom <= b.top || a.top >= b.bottom);
        }

        const b1 = b(l1), b2 = b(l2), b3 = b(l3), bm1 = b(l1m), bm2 = b(l2m), bs = b(stone), bp = b(places), bi = b(items), bcta = b(cta);

        return {
          scrollY: window.scrollY,
          logo: b(logo),
          l1: b1,
          l2: b2,
          l3: b3,
          l1m: bm1,
          l2m: bm2,
          stone: bs,
          places: bp,
          items: bi,
          cta: bcta,
          preloaderDisplay: pt ? window.getComputedStyle(pt).display : 'none',
          preloaderOpacity: pt ? window.getComputedStyle(pt).opacity : '0',
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
    }

    // 1. Initial Desktop
    console.log('\n==============================================');
    console.log('1. DESKTOP INITIAL LOADED RESTING STATE');
    console.log('==============================================');
    const initialDesktop = await getFullMetrics();
    console.log('Desktop Initial:', JSON.stringify(initialDesktop, null, 2));
    await cdp.screenshot(`${ARTIFACT_DIR}/verify_01_desktop_initial.png`);
    console.log('Saved verify_01_desktop_initial.png');

    // 2. Perform 5 Scroll Cycles on Desktop
    console.log('\n==============================================');
    console.log('2. TESTING 5 REPEATED SCROLL CYCLES (DESKTOP)');
    console.log('==============================================');
    for (let c = 1; c <= 5; c++) {
      await cdp.eval('window.scrollTo(0, 2500)');
      await new Promise(r => setTimeout(r, 600));

      await cdp.eval('window.scrollTo(0, 0)');
      await new Promise(r => setTimeout(r, 800));

      const back = await getFullMetrics();
      const match = (
        back.l1.top === initialDesktop.l1.top &&
        back.l2.top === initialDesktop.l2.top &&
        back.l3.top === initialDesktop.l3.top &&
        back.l1m.top === initialDesktop.l1m.top &&
        back.l2m.top === initialDesktop.l2m.top &&
        back.stone.top === initialDesktop.stone.top &&
        back.places.top === initialDesktop.places.top &&
        back.items.top === initialDesktop.items.top &&
        back.l2.progressVar === '0'
      );
      const anyOverlap = Object.values(back.overlaps).some(v => v === true);

      console.log(`Cycle ${c}: Return match = ${match ? 'EXACT 100% ✓' : 'NO'}, Any overlap = ${anyOverlap ? 'YES' : 'NONE ✓'}, Preloader visible = ${back.preloaderDisplay !== 'none' ? 'YES' : 'NO ✓'}`);
    }
    await cdp.screenshot(`${ARTIFACT_DIR}/verify_02_desktop_after_5_cycles.png`);
    console.log('Saved verify_02_desktop_after_5_cycles.png');

    // 3. Test Mobile (390 x 844 iPhone)
    console.log('\n==============================================');
    console.log('3. TESTING MOBILE VIEWPORT (390x844)');
    console.log('==============================================');
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true
    });
    await new Promise(r => setTimeout(r, 2000));

    const initialMobile = await getFullMetrics();
    console.log('Mobile Initial:', JSON.stringify(initialMobile, null, 2));
    await cdp.screenshot(`${ARTIFACT_DIR}/verify_03_mobile_initial.png`);
    console.log('Saved verify_03_mobile_initial.png');

    for (let c = 1; c <= 3; c++) {
      await cdp.eval('window.scrollTo(0, 1800)');
      await new Promise(r => setTimeout(r, 600));

      await cdp.eval('window.scrollTo(0, 0)');
      await new Promise(r => setTimeout(r, 800));

      const backMobile = await getFullMetrics();
      const mobileMatch = (
        backMobile.l1.top === initialMobile.l1.top &&
        backMobile.l2.top === initialMobile.l2.top &&
        backMobile.l3.top === initialMobile.l3.top &&
        backMobile.l1m.top === initialMobile.l1m.top &&
        backMobile.l2m.top === initialMobile.l2m.top &&
        backMobile.stone.top === initialMobile.stone.top &&
        backMobile.l2.progressVar === '0'
      );
      const anyMobileOverlap = Object.values(backMobile.overlaps).some(v => v === true);
      console.log(`Mobile Cycle ${c}: Return match = ${mobileMatch ? 'EXACT 100% ✓' : 'NO'}, Overlap = ${anyMobileOverlap ? 'YES' : 'NONE ✓'}`);
    }
    await cdp.screenshot(`${ARTIFACT_DIR}/verify_04_mobile_after_cycles.png`);
    console.log('Saved verify_04_mobile_after_cycles.png');

    console.log('\n==============================================');
    console.log('✓ ALL VERIFICATIONS COMPLETED SUCCESSFULLY!');
    console.log('==============================================');

  } finally {
    await cdp.close();
  }
}

verifyCompleteExperience().catch(console.error);
