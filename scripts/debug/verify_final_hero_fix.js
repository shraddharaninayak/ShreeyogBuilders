const CDP = require('./cdp_helper.js');
const fs = require('fs');

const ARTIFACT_DIR = 'C:/Users/supri/.gemini/antigravity/brain/ff998ab5-1a3d-42c3-84d4-6774c67af56b';

async function verifyFinalHero() {
  const cdp = new CDP(9233);
  try {
    console.log('Connecting to http://localhost:3000/ ...');
    await cdp.connect('http://localhost:3000/');

    // Poll until .c-welcome is loaded and preloader completes
    for (let i = 0; i < 30; i++) {
      const ready = await cdp.eval(`!!(document.documentElement && document.documentElement.classList.contains('-ready'))`);
      if (ready) break;
      await new Promise(r => setTimeout(r, 200));
    }
    await new Promise(r => setTimeout(r, 2500)); // Allow entrance transitions to settle

    async function getHeroMetrics() {
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

        function m(el) {
          if (!el) return null;
          const r = el.getBoundingClientRect();
          return { top: Math.round(r.top), left: Math.round(r.left), width: Math.round(r.width), height: Math.round(r.height) };
        }

        return {
          scrollY: window.scrollY,
          line1: m(l1),
          line2: m(l2),
          line3: m(l3),
          line1m: m(l1m),
          line2m: m(l2m),
          stone: m(stone),
          places: m(places),
          items: m(items),
          cta: m(cta),
          logo: m(logo),
          preloaderDisplay: pt ? window.getComputedStyle(pt).display : 'none',
          preloaderOpacity: pt ? window.getComputedStyle(pt).opacity : '0',
          l2Progress: l2 ? window.getComputedStyle(l2).getPropertyValue('--progress').trim() : null
        };
      })()`);
    }

    async function takeScreenshot(name) {
      const p = `${ARTIFACT_DIR}/${name}`;
      await cdp.screenshot(p);
      console.log('Saved screenshot:', name);
    }

    // 1. Initial Hero Layout
    console.log('\n==============================================');
    console.log('1. INITIAL HOMEPAGE HERO LAYOUT');
    console.log('==============================================');
    const initialMetrics = await getHeroMetrics();
    console.log('Initial Metrics:', JSON.stringify(initialMetrics, null, 2));
    await takeScreenshot('final_verify_01_initial_hero.png');

    // 2. Perform 5 Scroll Down and Back Up Cycles
    console.log('\n==============================================');
    console.log('2. TESTING 5 REPEATED SCROLL CYCLES');
    console.log('==============================================');
    const cycleResults = [];

    for (let cycle = 1; cycle <= 5; cycle++) {
      console.log(`\n--- Cycle ${cycle}: Scrolling down to 2500px ---`);
      await cdp.eval(`window.scrollTo(0, 2500)`);
      await new Promise(r => setTimeout(r, 600));

      console.log(`--- Cycle ${cycle}: Scrolling back up to 0px ---`);
      await cdp.eval(`window.scrollTo(0, 0)`);
      await new Promise(r => setTimeout(r, 1000));

      const backMetrics = await getHeroMetrics();
      cycleResults.push(backMetrics);
      console.log(`Cycle ${cycle} return metrics:`, {
        scrollY: backMetrics.scrollY,
        line1Top: backMetrics.line1?.top,
        line2Top: backMetrics.line2?.top,
        line3Top: backMetrics.line3?.top,
        stoneTop: backMetrics.stone?.top,
        placesTop: backMetrics.places?.top,
        itemsTop: backMetrics.items?.top,
        l2Progress: backMetrics.l2Progress,
        preloaderDisplay: backMetrics.preloaderDisplay
      });
    }

    await takeScreenshot('final_verify_02_after_5_cycles.png');

    // Verify all 5 cycles match the initial position
    const base = initialMetrics;
    cycleResults.forEach((res, idx) => {
      const match = (
        res.line1.top === base.line1.top &&
        res.line2.top === base.line2.top &&
        res.line3.top === base.line3.top &&
        res.stone.top === base.stone.top &&
        res.places.top === base.places.top &&
        res.items.top === base.items.top &&
        res.l2Progress === '0'
      );
      console.log(`Cycle ${idx + 1} exactly matches initial?`, match ? 'YES! ✓' : 'NO');
    });

    // 3. Refresh and Repeat Test
    console.log('\n==============================================');
    console.log('3. TESTING REFRESH AND REPEAT');
    console.log('==============================================');
    await cdp.eval(`location.reload()`);
    await new Promise(r => setTimeout(r, 3500));

    const refreshedInitial = await getHeroMetrics();
    console.log('Refreshed Initial Metrics:', JSON.stringify(refreshedInitial, null, 2));

    await cdp.eval(`window.scrollTo(0, 2000)`);
    await new Promise(r => setTimeout(r, 600));
    await cdp.eval(`window.scrollTo(0, 0)`);
    await new Promise(r => setTimeout(r, 1000));

    const refreshedBack = await getHeroMetrics();
    console.log('Refreshed Back Metrics:', JSON.stringify(refreshedBack, null, 2));
    await takeScreenshot('final_verify_03_refreshed_back.png');

    // 4. Test Mobile Viewport (390 x 844 iPhone)
    console.log('\n==============================================');
    console.log('4. TESTING MOBILE VIEWPORT (390 x 844)');
    console.log('==============================================');
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true
    });
    await new Promise(r => setTimeout(r, 1500));

    const mobileInitial = await getHeroMetrics();
    console.log('Mobile Initial Metrics:', JSON.stringify(mobileInitial, null, 2));
    await takeScreenshot('final_verify_04_mobile_initial.png');

    await cdp.eval(`window.scrollTo(0, 1500)`);
    await new Promise(r => setTimeout(r, 600));
    await cdp.eval(`window.scrollTo(0, 0)`);
    await new Promise(r => setTimeout(r, 1000));

    const mobileBack = await getHeroMetrics();
    console.log('Mobile Back Metrics:', JSON.stringify(mobileBack, null, 2));
    await takeScreenshot('final_verify_05_mobile_back.png');

    const mobileMatch = (
      mobileBack.line1.top === mobileInitial.line1.top &&
      mobileBack.line2.top === mobileInitial.line2.top &&
      mobileBack.line3.top === mobileInitial.line3.top &&
      mobileBack.l2Progress === '0'
    );
    console.log('Mobile return exactly matches initial?', mobileMatch ? 'YES! ✓' : 'NO');

  } finally {
    await cdp.close();
  }
}

verifyFinalHero().catch(console.error);
