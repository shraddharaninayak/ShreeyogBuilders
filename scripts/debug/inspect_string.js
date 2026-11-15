const CDP = require('./cdp_helper.js');

async function inspectStringObject() {
  const cdp = new CDP(9233);
  try {
    await cdp.connect('http://localhost:3000/');
    await new Promise(r => setTimeout(r, 2000));

    const res = await cdp.eval(`(() => {
      // Find window.__string or similar instance
      // Let's inspect all properties on window and document
      const keys = Object.keys(window).filter(k => k.toLowerCase().includes('string') || k.toLowerCase().includes('scroll') || k.toLowerCase().includes('nuxt'));
      
      const welcomeEl = document.querySelector('.c-welcome');
      const l2 = document.querySelector('.c-welcome .-w span.line-2');

      return {
        keys,
        welcomeAttrs: {
          string: welcomeEl.getAttribute('string'),
          stringId: welcomeEl.getAttribute('string-id'),
          selfDisable: welcomeEl.hasAttribute('string-self-disable'),
          enterVp: welcomeEl.getAttribute('string-enter-vp'),
          inited: welcomeEl.getAttribute('string-inited')
        },
        l2Attrs: {
          string: l2.getAttribute('string'),
          stringCopyFrom: l2.getAttribute('string-copy-from'),
          style: l2.getAttribute('style')
        }
      };
    })()`);
    console.log(JSON.stringify(res, null, 2));

    // Scroll down and inspect
    console.log('Scrolling down...');
    await cdp.eval(`window.scrollTo(0, 1500)`);
    await new Promise(r => setTimeout(r, 1000));

    const scrolledState = await cdp.eval(`(() => {
      const l2 = document.querySelector('.c-welcome .-w span.line-2');
      return {
        scrollY: window.scrollY,
        l2Style: l2.getAttribute('style')
      };
    })()`);
    console.log('Scrolled down:', scrolledState);

    // Scroll back up and inspect
    console.log('Scrolling back up...');
    await cdp.eval(`window.scrollTo(0, 0)`);
    await new Promise(r => setTimeout(r, 1000));

    const backState = await cdp.eval(`(() => {
      const l2 = document.querySelector('.c-welcome .-w span.line-2');
      const stone = document.querySelector('.c-welcome .-w .stone');
      return {
        scrollY: window.scrollY,
        l2Style: l2.getAttribute('style'),
        stoneStyle: stone.getAttribute('style')
      };
    })()`);
    console.log('Back at top:', backState);

  } finally {
    await cdp.close();
  }
}

inspectStringObject().catch(console.error);
