const CDP = require('./cdp_helper.js');

async function inspectScrollContainers() {
  const cdp = new CDP(9233);
  try {
    await cdp.connect('http://localhost:3000/');
    await new Promise(r => setTimeout(r, 2000));

    const res = await cdp.eval(`(() => {
      const nuxt = window.useNuxtApp();
      const st = nuxt.$stringTune;
      
      return {
        scrollContainer: st.data.scroll.scrollContainer === window ? 'window' : st.data.scroll.scrollContainer?.tagName,
        container: st.data.scroll.container === window ? 'window' : st.data.scroll.container?.tagName,
        elementContainer: st.data.scroll.elementContainer === window ? 'window' : st.data.scroll.elementContainer?.tagName,
        lastScrollEmitted: st.lastScrollEmitted,
        pendingScroll: st.pendingScroll,
        scrollMode: st.scrollManager.get().name
      };
    })()`);
    console.log(JSON.stringify(res, null, 2));

  } finally {
    await cdp.close();
  }
}

inspectScrollContainers().catch(console.error);
