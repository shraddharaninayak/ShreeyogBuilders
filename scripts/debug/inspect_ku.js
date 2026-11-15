const CDP = require('./cdp_helper.js');

async function debugKuObjects() {
  const cdp = new CDP(9233);
  try {
    await cdp.connect('http://localhost:3000/');
    await new Promise(r => setTimeout(r, 2000));

    // Scroll to 2500 and back to 0
    await cdp.eval(`window.scrollTo(0, 2500)`);
    await new Promise(r => setTimeout(r, 1000));
    await cdp.eval(`window.scrollTo(0, 0)`);
    await new Promise(r => setTimeout(r, 1500));

    const res2 = await cdp.eval(`(() => {
      const nuxt = window.useNuxtApp();
      const st = nuxt.$stringTune;
      let progressMod = null;
      for (const m of st.moduleManager.modules) {
        if (m.htmlKey === 'progress') {
          progressMod = m;
          break;
        }
      }
      const welcomeObj = progressMod.objects.find(o => o.id === 'welcome');
      return {
        transformedCurrent: st.data.scroll.transformedCurrent,
        scrollCurrent: st.data.scroll.current,
        scrollTarget: st.data.scroll.target,
        welcome: {
          progress: welcomeObj.progress,
          progressRaw: welcomeObj.progressRaw,
          startPosition: welcomeObj.startPosition,
          differencePosition: welcomeObj.differencePosition,
          progressApplied: welcomeObj.getProperty('progress-applied')
        }
      };
    })()`);
    console.log('After scroll to 2500 and back to 0:', JSON.stringify(res2, null, 2));

  } finally {
    await cdp.close();
  }
}

debugKuObjects().catch(console.error);
