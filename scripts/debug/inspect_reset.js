const CDP = require('./cdp_helper.js');

async function testHeroReset() {
  const cdp = new CDP(9233);
  try {
    await cdp.connect('http://localhost:3000/');
    await new Promise(r => setTimeout(r, 2000));

    // Scroll to 2500 and back to 0
    await cdp.eval(`window.scrollTo(0, 2500)`);
    await new Promise(r => setTimeout(r, 1000));
    await cdp.eval(`window.scrollTo(0, 0)`);
    await new Promise(r => setTimeout(r, 1000));

    // Reset hero progress
    await cdp.eval(`(() => {
      const nuxt = window.useNuxtApp ? window.useNuxtApp() : null;
      const st = nuxt ? nuxt.$stringTune : null;
      if (st) {
        const w = st.objectManager.objects.get('welcome');
        if (w) {
          w.progress = 0;
          w.progressRaw = 0;
          w.setProperty('progress-applied', 0);
          w.mirrorObjects.forEach(m => {
            m.setProperty('progress', 0);
            m.htmlElement.style.setProperty('--progress', '0');
          });
        }
        st.moduleManager.onScrollMeasure();
        st.moduleManager.onMutate();
      }

      // Also ensure DOM elements have --progress: 0 directly
      const els = document.querySelectorAll('.c-welcome, .c-welcome [string-copy-from="welcome"], .c-welcome .-w > *');
      els.forEach(el => {
        el.style.setProperty('--progress', '0');
      });
    })()`);

    await new Promise(r => setTimeout(r, 500));

    const state = await cdp.eval(`(() => {
      const l1 = document.querySelector('.c-welcome .-w span.line-1');
      const l2 = document.querySelector('.c-welcome .-w span.line-2');
      const l3 = document.querySelector('.c-welcome .-w span.line-3');
      const stone = document.querySelector('.c-welcome .-w .stone');
      const places = document.querySelector('.c-welcome .-w .places');
      const items = document.querySelector('.c-welcome .-w .items');
      const l1m = document.querySelector('.c-welcome .-w .line-1-m');
      const l2m = document.querySelector('.c-welcome .-w .line-2-m');

      return {
        l1Top: Math.round(l1.getBoundingClientRect().top),
        l2Top: Math.round(l2.getBoundingClientRect().top),
        l3Top: Math.round(l3.getBoundingClientRect().top),
        stoneTop: Math.round(stone.getBoundingClientRect().top),
        placesTop: Math.round(places.getBoundingClientRect().top),
        itemsTop: Math.round(items.getBoundingClientRect().top),
        l1mTop: Math.round(l1m.getBoundingClientRect().top),
        l2mTop: Math.round(l2m.getBoundingClientRect().top),
        stoneTransform: window.getComputedStyle(stone).transform,
        stoneScale: window.getComputedStyle(stone).scale,
        stoneOpacity: window.getComputedStyle(stone).opacity
      };
    })()`);
    console.log('RESET STATE:', JSON.stringify(state, null, 2));

  } finally {
    await cdp.close();
  }
}

testHeroReset().catch(console.error);
