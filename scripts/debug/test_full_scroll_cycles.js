const CDP = require('./cdp_helper.js');

const ARTIFACT_DIR = 'C:/Users/supri/.gemini/antigravity/brain/ff998ab5-1a3d-42c3-84d4-6774c67af56b';

async function testFullScrollCycles() {
  const cdp = new CDP(9233);
  try {
    await cdp.connect('http://localhost:3000/');
    await new Promise(r => setTimeout(r, 2500));

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

        function b(el) {
          if (!el) return null;
          const r = el.getBoundingClientRect();
          return { top: Math.round(r.top), left: Math.round(r.left), width: Math.round(r.width), height: Math.round(r.height) };
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
          l2Progress: l2 ? window.getComputedStyle(l2).getPropertyValue('--progress').trim() : null
        };
      })()`);
    }

    const initial = await getMetrics();
    console.log('--- Initial Settled Metrics ---', JSON.stringify(initial, null, 2));
    await cdp.screenshot(`${ARTIFACT_DIR}/verify_final_hero_01_initial.png`);

    for (let c = 1; c <= 5; c++) {
      await cdp.eval('window.scrollTo(0, 2500)');
      await new Promise(r => setTimeout(r, 600));

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
        back.l2Progress === '0'
      );
      console.log(`Cycle ${c} exact match with initial?`, match ? 'YES! ✓' : 'NO', {
        l1Top: back.l1.top,
        l2Top: back.l2.top,
        l3Top: back.l3.top,
        l1mTop: back.l1m.top,
        l2mTop: back.l2m.top,
        stoneTop: back.stone.top,
        placesTop: back.places.top,
        itemsTop: back.items.top,
        progress: back.l2Progress
      });
    }

    await cdp.screenshot(`${ARTIFACT_DIR}/verify_final_hero_02_after_5_cycles.png`);
    console.log('Saved verify_final_hero_02_after_5_cycles.png');

    // Test reload
    console.log('\n--- Testing Reload & Return ---');
    await cdp.eval('location.reload()');
    await new Promise(r => setTimeout(r, 3000));

    await cdp.eval('window.scrollTo(0, 2000)');
    await new Promise(r => setTimeout(r, 600));
    await cdp.eval('window.scrollTo(0, 0)');
    await new Promise(r => setTimeout(r, 800));

    const refreshedBack = await getMetrics();
    console.log('Refreshed back metrics:', refreshedBack);
    await cdp.screenshot(`${ARTIFACT_DIR}/verify_final_hero_03_refreshed_back.png`);
    console.log('Saved verify_final_hero_03_refreshed_back.png');

  } finally {
    await cdp.close();
  }
}

testFullScrollCycles().catch(console.error);
