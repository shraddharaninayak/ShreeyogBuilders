const CDP = require('./cdp_helper.js');

(async () => {
  const cdp = new CDP(9240);
  try {
    await cdp.connect('http://localhost:3000/');
    await new Promise(r => setTimeout(r, 4000));

    const stInfo = await cdp.eval(`(() => {
      const nuxtApp = window.useNuxtApp ? window.useNuxtApp() : null;
      const st = nuxtApp ? nuxtApp.$stringTune : null;
      if (!st) return { error: 'No $stringTune' };

      const w = st.objectManager.objects.get('welcome');
      if (!w) return { error: 'No welcome object in objectManager' };

      return {
        id: w.id,
        progress: w.progress,
        progressRaw: w.progressRaw,
        inview: w.inview,
        mirrors: w.mirrorObjects ? w.mirrorObjects.map(m => ({ id: m.id, progress: m.progress, tagName: m.htmlElement?.tagName, className: m.htmlElement?.className })) : [],
        modules: w.modules ? w.modules.map(m => m.constructor?.name) : [],
        constructorName: w.constructor?.name
      };
    })()`);

    console.log('StringTune Welcome object:');
    console.log(JSON.stringify(stInfo, null, 2));

  } catch (err) {
    console.error('Error:', err);
  } finally {
    await cdp.close();
  }
})();
