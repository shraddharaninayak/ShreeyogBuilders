const CDP = require('./cdp_helper.js');

async function debugLoop() {
  const cdp = new CDP(9233);
  try {
    await cdp.connect('http://localhost:3000/');
    await new Promise(r => setTimeout(r, 2000));

    await cdp.eval(`window.scrollTo(0, 2500)`);
    await new Promise(r => setTimeout(r, 1000));
    await cdp.eval(`window.scrollTo(0, 0)`);
    await new Promise(r => setTimeout(r, 1500));

    const res = await cdp.eval(`(() => {
      const nuxt = window.useNuxtApp();
      const st = nuxt.$stringTune;
      return {
        current: st.data.scroll.current,
        lastScrollEmitted: st.lastScrollEmitted,
        pendingScroll: st.pendingScroll,
        lerped: st.data.scroll.lerped,
        delta: st.data.scroll.delta
      };
    })()`);
    console.log('Loop state:', res);

  } finally {
    await cdp.close();
  }
}

debugLoop().catch(console.error);
