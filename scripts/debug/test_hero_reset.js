const CDP = require('./cdp_helper.js');

async function testHeroReset() {
  const cdp = new CDP(9233);
  try {
    console.log('Connecting to http://localhost:3000/ ...');
    await cdp.connect('http://localhost:3000/');
    
    // Wait for page to be ready and entrance transitions to complete
    await new Promise(r => setTimeout(r, 3000));

    async function getSnapshot() {
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
        const welcome = document.querySelector('.c-welcome');

        function m(el) {
          if (!el) return null;
          const r = el.getBoundingClientRect();
          const cs = window.getComputedStyle(el);
          return {
            top: Math.round(r.top),
            left: Math.round(r.left),
            width: Math.round(r.width),
            height: Math.round(r.height),
            transform: cs.transform,
            opacity: cs.opacity,
            progressVar: cs.getPropertyValue('--progress')
          };
        }

        return {
          scrollY: window.scrollY,
          welcomeProgress: welcome ? window.getComputedStyle(welcome).getPropertyValue('--progress') : null,
          l1: m(l1),
          l2: m(l2),
          l3: m(l3),
          l1m: m(l1m),
          l2m: m(l2m),
          stone: m(stone),
          places: m(places),
          items: m(items),
          cta: m(cta)
        };
      })()`);
    }

    const initial = await getSnapshot();
    console.log('--- Initial Settled Snapshot ---');
    console.log(JSON.stringify(initial, null, 2));

    // 5 scroll cycles
    for (let i = 1; i <= 5; i++) {
      console.log(`\nCycle ${i}: scrolling to 2500...`);
      await cdp.eval(`window.scrollTo(0, 2500)`);
      await new Promise(r => setTimeout(r, 600));

      console.log(`Cycle ${i}: scrolling back to 0...`);
      await cdp.eval(`window.scrollTo(0, 0)`);
      await new Promise(r => setTimeout(r, 800));

      const back = await getSnapshot();
      console.log(`Cycle ${i} back metrics:`, {
        scrollY: back.scrollY,
        welcomeProgress: back.welcomeProgress,
        l1Top: back.l1?.top,
        l2Top: back.l2?.top,
        l3Top: back.l3?.top,
        l1mTop: back.l1m?.top,
        l2mTop: back.l2m?.top,
        stoneTop: back.stone?.top,
        placesTop: back.places?.top,
        itemsTop: back.items?.top,
        l2Progress: back.l2?.progressVar
      });

      const match = (
        back.l1.top === initial.l1.top &&
        back.l2.top === initial.l2.top &&
        back.l3.top === initial.l3.top &&
        back.stone.top === initial.stone.top &&
        back.places.top === initial.places.top &&
        back.items.top === initial.items.top &&
        back.l1m.top === initial.l1m.top &&
        back.l2m.top === initial.l2m.top
      );
      console.log(`Cycle ${i} EXACT MATCH?`, match ? 'YES! 100% IDENTICAL' : 'NO');
    }

  } finally {
    await cdp.close();
  }
}

testHeroReset().catch(console.error);
