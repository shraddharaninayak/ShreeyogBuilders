const CDP = require('./cdp_helper.js');

async function testWheelScroll() {
  const cdp = new CDP(9233);
  try {
    await cdp.connect('http://localhost:3000/');
    await new Promise(r => setTimeout(r, 2000));

    async function checkState(label) {
      const res = await cdp.eval(`(() => {
        const welcome = document.querySelector('.c-welcome');
        const l1 = document.querySelector('.c-welcome .-w span.line-1');
        const l2 = document.querySelector('.c-welcome .-w span.line-2');
        const l3 = document.querySelector('.c-welcome .-w span.line-3');
        const stone = document.querySelector('.c-welcome .-w .stone');
        const places = document.querySelector('.c-welcome .-w .places');
        const items = document.querySelector('.c-welcome .-w .items');
        const l1m = document.querySelector('.c-welcome .-w .line-1-m');
        const l2m = document.querySelector('.c-welcome .-w .line-2-m');

        return {
          scrollY: window.scrollY,
          welcomeClass: welcome ? welcome.className : null,
          l1Top: l1 ? Math.round(l1.getBoundingClientRect().top) : null,
          l2Top: l2 ? Math.round(l2.getBoundingClientRect().top) : null,
          l3Top: l3 ? Math.round(l3.getBoundingClientRect().top) : null,
          l1mTop: l1m ? Math.round(l1m.getBoundingClientRect().top) : null,
          l2mTop: l2m ? Math.round(l2m.getBoundingClientRect().top) : null,
          stoneTop: stone ? Math.round(stone.getBoundingClientRect().top) : null,
          placesTop: places ? Math.round(places.getBoundingClientRect().top) : null,
          itemsTop: items ? Math.round(items.getBoundingClientRect().top) : null,
          l2Style: l2 ? l2.getAttribute('style') : null,
          stoneStyle: stone ? stone.getAttribute('style') : null
        };
      })()`);
      console.log(label, res);
    }

    await checkState('--- 1. INITIAL:');

    // Dispatch mouseWheel downwards in increments
    console.log('\n--- SCROLLING DOWN WITH WHEEL (total 2500px) ---');
    for (let i = 0; i < 25; i++) {
      await cdp.eval(`window.scrollBy({ top: 100, behavior: 'instant' })`);
      await new Promise(r => setTimeout(r, 50));
    }
    await new Promise(r => setTimeout(r, 1000));
    await checkState('--- 2. AT BOTTOM (scrollY ~ 2500):');

    console.log('\n--- SCROLLING BACK UP WITH WHEEL (total 2500px) ---');
    for (let i = 0; i < 25; i++) {
      await cdp.eval(`window.scrollBy({ top: -100, behavior: 'instant' })`);
      await new Promise(r => setTimeout(r, 50));
    }
    await new Promise(r => setTimeout(r, 1500));
    await checkState('--- 3. BACK AT TOP:');

  } finally {
    await cdp.close();
  }
}

testWheelScroll().catch(console.error);
