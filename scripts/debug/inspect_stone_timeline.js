const CDP = require('./cdp_helper.js');

async function inspectStoneTimeline() {
  const cdp = new CDP(9233);
  try {
    await cdp.connect('http://localhost:3000/');

    for (const delay of [200, 500, 1000, 2000, 3000, 4500]) {
      await new Promise(r => setTimeout(r, delay === 200 ? 200 : delay - 200));
      const info = await cdp.eval(`(() => {
        const s = document.querySelector('.c-welcome .-w .stone');
        const p = document.querySelector('.c-welcome .-w .places');
        const m1 = document.querySelector('.c-welcome .-w .line-1-m');
        const html = document.documentElement;
        if (!s) return null;
        const cs = window.getComputedStyle(s);
        const r = s.getBoundingClientRect();
        return {
          htmlClass: html.className,
          stoneRect: { top: Math.round(r.top), height: Math.round(r.height) },
          stoneStyle: s.getAttribute('style'),
          stoneTransform: cs.transform,
          stoneTranslate: cs.translate,
          stoneScale: cs.scale,
          placesTop: Math.round(p.getBoundingClientRect().top),
          m1Top: Math.round(m1.getBoundingClientRect().top)
        };
      })()`);
      console.log(`At ~${delay}ms:`, info);
    }

    console.log('\n--- Scrolling to 2500 and back to 0 ---');
    await cdp.eval('window.scrollTo(0, 2500)');
    await new Promise(r => setTimeout(r, 600));
    await cdp.eval('window.scrollTo(0, 0)');
    await new Promise(r => setTimeout(r, 1000));

    const afterScroll = await cdp.eval(`(() => {
      const s = document.querySelector('.c-welcome .-w .stone');
      const p = document.querySelector('.c-welcome .-w .places');
      const m1 = document.querySelector('.c-welcome .-w .line-1-m');
      const html = document.documentElement;
      const cs = window.getComputedStyle(s);
      const r = s.getBoundingClientRect();
      return {
        htmlClass: html.className,
        stoneRect: { top: Math.round(r.top), height: Math.round(r.height) },
        stoneStyle: s.getAttribute('style'),
        stoneTransform: cs.transform,
        stoneTranslate: cs.translate,
        stoneScale: cs.scale,
        placesTop: Math.round(p.getBoundingClientRect().top),
        m1Top: Math.round(m1.getBoundingClientRect().top)
      };
    })()`);
    console.log('After scroll back to top:', afterScroll);

  } finally {
    await cdp.close();
  }
}

inspectStoneTimeline().catch(console.error);
