const CDP = require('./cdp_helper.js');

async function inspectStringTune() {
  const cdp = new CDP(9233);
  try {
    await cdp.connect('http://localhost:3000/');
    await new Promise(r => setTimeout(r, 2000));

    const res = await cdp.eval(`(() => {
      const nuxt = window.useNuxtApp();
      const st = nuxt ? nuxt.$stringTune : null;
      if (!st) return { error: 'no $stringTune' };

      const welcomeObj = st.objectManager.objects.get('welcome');
      
      return {
        hasSt: true,
        scrollCurrent: st.data.scroll.current,
        scrollTarget: st.data.scroll.target,
        transformedCurrent: st.data.scroll.transformedCurrent,
        welcome: welcomeObj ? {
          id: welcomeObj.id,
          progress: welcomeObj.progress,
          progressRaw: welcomeObj.progressRaw,
          startPosition: welcomeObj.startPosition,
          differencePosition: welcomeObj.differencePosition,
          mirrors: welcomeObj.mirrorObjects.map(m => ({
            id: m.id,
            tag: m.htmlElement.tagName,
            classes: m.htmlElement.className,
            progress: m.progress,
            style: m.htmlElement.getAttribute('style')
          }))
        } : null
      };
    })()`);
    console.log(JSON.stringify(res, null, 2));

  } finally {
    await cdp.close();
  }
}

inspectStringTune().catch(console.error);
