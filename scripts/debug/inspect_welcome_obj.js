const CDP = require('./cdp_helper.js');

async function inspectWelcomeObject() {
  const cdp = new CDP(9233);
  try {
    await cdp.connect('http://localhost:3000/');
    await new Promise(r => setTimeout(r, 2000));

    const res = await cdp.eval(`(() => {
      // Find the string manager
      // In Nuxt, let's see how to access the string instance
      // Let's search window or document for string instances
      let stringInstance = null;
      // Check Nuxt app
      try {
        const nuxt = window.useNuxtApp ? window.useNuxtApp() : null;
        if (nuxt) {
          stringInstance = nuxt.$string || (nuxt.vueApp && nuxt.vueApp.config.globalProperties.$string);
        }
      } catch (e) {}

      // If not on Nuxt app directly, check window properties
      if (!stringInstance) {
        for (const k of Object.keys(window)) {
          if (window[k] && window[k].objects && window[k].modules) {
            stringInstance = window[k];
            break;
          }
        }
      }

      const welcome = document.querySelector('.c-welcome');
      const obj = stringInstance ? stringInstance.objects.get('welcome') : null;

      return {
        hasInstance: !!stringInstance,
        objInfo: obj ? {
          id: obj.id,
          progress: obj.progress,
          progressRaw: obj.progressRaw,
          startPosition: obj.startPosition,
          differencePosition: obj.differencePosition,
          mirrors: obj.mirrorObjects.map(m => ({
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

inspectWelcomeObject().catch(console.error);
