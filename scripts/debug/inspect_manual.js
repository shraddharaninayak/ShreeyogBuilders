const CDP = require('./cdp_helper.js');

async function testManualMeasure() {
  const cdp = new CDP(9233);
  try {
    await cdp.connect('http://localhost:3000/');
    await new Promise(r => setTimeout(r, 2000));

    // Scroll to 2500 and back to 0
    await cdp.eval(`window.scrollTo(0, 2500)`);
    await new Promise(r => setTimeout(r, 1000));
    await cdp.eval(`window.scrollTo(0, 0)`);
    await new Promise(r => setTimeout(r, 1500));

    // Before manual trigger
    const before = await cdp.eval(`(() => {
      const nuxt = window.useNuxtApp();
      const st = nuxt.$stringTune;
      const w = st.objectManager.objects.get('welcome');
      return {
        progress: w.progress,
        progressRaw: w.progressRaw,
        progressApplied: w.getProperty('progress-applied'),
        mirror1: w.mirrorObjects[0].htmlElement.getAttribute('style')
      };
    })()`);
    console.log('Before manual measure:', before);

    // Call moduleManager.onScrollMeasure() and onMutate()
    const after = await cdp.eval(`(() => {
      const nuxt = window.useNuxtApp();
      const st = nuxt.$stringTune;
      
      console.log('Calling st.moduleManager.onScrollMeasure()...');
      st.moduleManager.onScrollMeasure();
      st.moduleManager.onMutate();

      const w = st.objectManager.objects.get('welcome');
      return {
        progress: w.progress,
        progressRaw: w.progressRaw,
        progressApplied: w.getProperty('progress-applied'),
        mirror1: w.mirrorObjects[0].htmlElement.getAttribute('style')
      };
    })()`);
    console.log('After manual measure:', after);

  } finally {
    await cdp.close();
  }
}

testManualMeasure().catch(console.error);
