const CDP = require('./cdp_helper.js');

async function debugStringTuneScroll() {
  const cdp = new CDP(9233);
  try {
    await cdp.connect('http://localhost:3000/');
    await new Promise(r => setTimeout(r, 2000));

    async function checkState(label) {
      const res = await cdp.eval(`(() => {
        const nuxt = window.useNuxtApp();
        const st = nuxt ? nuxt.$stringTune : null;
        const welcomeObj = st ? st.objectManager.objects.get('welcome') : null;
        
        return {
          label: '${label}',
          scrollY: window.scrollY,
          scrollCurrent: st ? st.data.scroll.current : null,
          scrollTarget: st ? st.data.scroll.target : null,
          inviewActiveCount: st ? st.objectManager.inviewActive.size : null,
          welcomeInInviewActive: st ? st.objectManager.inviewActive.has(welcomeObj) : null,
          welcomeProgress: welcomeObj ? welcomeObj.progress : null,
          welcomeProgressApplied: welcomeObj ? welcomeObj.getProperty('progress-applied') : null,
          mirrorProgresses: welcomeObj ? welcomeObj.mirrorObjects.map(m => ({
            id: m.id,
            progress: m.progress,
            style: m.htmlElement.getAttribute('style')
          })) : null
        };
      })()`);
      console.log(JSON.stringify(res, null, 2));
    }

    await checkState('Initial (0)');

    console.log('\n--- Scrolling to 2500 via scrollTo ---');
    await cdp.eval(`window.scrollTo(0, 2500)`);
    await new Promise(r => setTimeout(r, 1000));
    await checkState('At 2500');

    console.log('\n--- Scrolling back to 0 via scrollTo ---');
    await cdp.eval(`window.scrollTo(0, 0)`);
    await new Promise(r => setTimeout(r, 1500));
    await checkState('Back at 0');

  } finally {
    await cdp.close();
  }
}

debugStringTuneScroll().catch(console.error);
