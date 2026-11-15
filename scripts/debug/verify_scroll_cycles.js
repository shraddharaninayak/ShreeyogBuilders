const CDP = require('./cdp_helper.js');

const ARTIFACT_DIR = 'C:/Users/supri/.gemini/antigravity/brain/ff998ab5-1a3d-42c3-84d4-6774c67af56b';

async function verifyScrollCycles() {
  const cdp = new CDP(9233);
  try {
    console.log('Connecting to http://localhost:3000/ ...');
    await cdp.connect('http://localhost:3000/');
    await new Promise(r => setTimeout(r, 5000)); // allow loaded state and entrance transitions to fully settle

    async function getMetrics() {
      return await cdp.eval(`(() => {
        const l1 = document.querySelector('.c-welcome .-w span.line-1');
        const l2 = document.querySelector('.c-welcome .-w span.line-2');
        const l3 = document.querySelector('.c-welcome .-w span.line-3');
        const l1m = document.querySelector('.c-welcome .-w .line-1-m');
        const l2m = document.querySelector('.c-welcome .-w .line-2-m');
        const stone = document.querySelector('.c-welcome .-w .stone');
        const places = document.querySelector('.c-welcome .-w .places');
        const items = document.querySelector('.c-welcome .-w .items');
        const logo = document.querySelector('.shreeyog-brand-logo');
        const pt = document.querySelector('.page-transition');

        function b(el) {
          if (!el) return null;
          const r = el.getBoundingClientRect();
          const cs = window.getComputedStyle(el);
          return {
            top: Math.round(r.top),
            left: Math.round(r.left),
            width: Math.round(r.width),
            height: Math.round(r.height),
            progress: cs.getPropertyValue('--progress').trim()
          };
        }

        return {
          scrollY: window.scrollY,
          l1: b(l1),
          l2: b(l2),
          l3: b(l3),
          l1m: b(l1m),
          l2m: b(l2m),
          stone: b(stone),
          places: b(places),
          items: b(items),
          logo: b(logo),
          preloaderDisplay: pt ? window.getComputedStyle(pt).display : 'none'
        };
      })()`);
    }

    const initial = await getMetrics();
    console.log('\n==============================================');
    console.log('INITIAL DESKTOP SETTLED STATE:');
    console.log(JSON.stringify(initial, null, 2));
    console.log('==============================================');

    await cdp.screenshot(`${ARTIFACT_DIR}/final_evidence_01_initial_hero.png`);
    console.log('Saved final_evidence_01_initial_hero.png');

    console.log('\n--- EXECUTING 5 FULL SCROLL CYCLES ---');
    for (let c = 1; c <= 5; c++) {
      // Scroll down
      await cdp.eval('window.scrollTo(0, 2500)');
      await new Promise(r => setTimeout(r, 600));

      // Scroll back to top
      await cdp.eval('window.scrollTo(0, 0)');
      await new Promise(r => setTimeout(r, 800));

      const back = await getMetrics();
      const match = (
        back.l1.top === initial.l1.top &&
        back.l2.top === initial.l2.top &&
        back.l3.top === initial.l3.top &&
        back.l1m.top === initial.l1m.top &&
        back.l2m.top === initial.l2m.top &&
        back.stone.top === initial.stone.top &&
        back.places.top === initial.places.top &&
        back.items.top === initial.items.top &&
        back.l2.progress === '0'
      );

      console.log(`Cycle ${c}: Return Match = ${match ? 'EXACT 100% (0px delta) ✓' : 'NO'}, Progress = ${back.l2.progress}, Preloader = ${back.preloaderDisplay}`);
      if (!match) {
        console.log('Delta:', {
          l1: back.l1.top - initial.l1.top,
          l2: back.l2.top - initial.l2.top,
          l3: back.l3.top - initial.l3.top,
          stone: back.stone.top - initial.stone.top,
          places: back.places.top - initial.places.top,
          items: back.items.top - initial.items.top
        });
      }
    }

    await cdp.screenshot(`${ARTIFACT_DIR}/final_evidence_02_after_5_cycles.png`);
    console.log('Saved final_evidence_02_after_5_cycles.png');

    // Test Reload
    console.log('\n--- TESTING PAGE RELOAD AND RETURN ---');
    await cdp.eval('location.reload()');
    await new Promise(r => setTimeout(r, 5000));

    await cdp.eval('window.scrollTo(0, 2000)');
    await new Promise(r => setTimeout(r, 600));
    await cdp.eval('window.scrollTo(0, 0)');
    await new Promise(r => setTimeout(r, 800));

    const reloaded = await getMetrics();
    const reloadMatch = (
      reloaded.l1.top === initial.l1.top &&
      reloaded.l2.top === initial.l2.top &&
      reloaded.l3.top === initial.l3.top &&
      reloaded.l1m.top === initial.l1m.top &&
      reloaded.l2m.top === initial.l2m.top &&
      reloaded.stone.top === initial.stone.top &&
      reloaded.places.top === initial.places.top &&
      reloaded.items.top === initial.items.top &&
      reloaded.l2.progress === '0'
    );
    console.log(`Reload & Return Match = ${reloadMatch ? 'EXACT 100% (0px delta) ✓' : 'NO'}`);
    await cdp.screenshot(`${ARTIFACT_DIR}/final_evidence_03_refreshed_back.png`);
    console.log('Saved final_evidence_03_refreshed_back.png');

  } finally {
    await cdp.close();
  }
}

verifyScrollCycles().catch(console.error);
