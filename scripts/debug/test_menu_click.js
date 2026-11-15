const CDP = require('./cdp_helper.js');

(async () => {
  const cdp = new CDP(9236);
  try {
    await cdp.connect('http://localhost:3000/');
    await new Promise(r => setTimeout(r, 4000));

    // Test 1: Click Menu
    console.log('Testing Menu Click...');
    await cdp.eval(`(() => {
      const btn = document.getElementById('menuToggleBtn') || document.querySelector('.menu.button');
      if (btn) btn.click();
    })()`);
    await new Promise(r => setTimeout(r, 1000));
    await cdp.screenshot('C:/Users/supri/.gemini/antigravity/brain/052d3503-3ffa-4c2b-b51f-0571d6a9d35d/after_menu_open.png');

    // Close menu
    await cdp.eval(`(() => {
      const closeBtn = document.getElementById('projects-menu-close-btn') || document.getElementById('projects-menu-cross-btn');
      if (closeBtn) closeBtn.click();
      else {
        const btn = document.getElementById('menuToggleBtn') || document.querySelector('.menu.button');
        if (btn) btn.click();
      }
    })()`);
    await new Promise(r => setTimeout(r, 1000));
    await cdp.screenshot('C:/Users/supri/.gemini/antigravity/brain/052d3503-3ffa-4c2b-b51f-0571d6a9d35d/after_menu_close.png');

    const infoAfterMenu = await cdp.eval(`(() => {
      const l1 = document.querySelector('.c-welcome .-w span.line-1');
      const l2 = document.querySelector('.c-welcome .-w span.line-2');
      const l3 = document.querySelector('.c-welcome .-w span.line-3');
      const l1m = document.querySelector('.c-welcome .-w .line-1-m');
      const l2m = document.querySelector('.c-welcome .-w .line-2-m');

      function getProps(el) {
        if (!el) return null;
        const r = el.getBoundingClientRect();
        const cs = window.getComputedStyle(el);
        return {
          text: el.innerText.trim(),
          top: Math.round(r.top),
          left: Math.round(r.left),
          transform: cs.transform,
          styleTransform: el.style.transform,
          cssText: el.style.cssText
        };
      }

      return {
        l1: getProps(l1),
        l2: getProps(l2),
        l3: getProps(l3),
        l1m: getProps(l1m),
        l2m: getProps(l2m)
      };
    })()`);

    console.log('After Menu Open/Close:');
    console.log(JSON.stringify(infoAfterMenu, null, 2));

  } catch (err) {
    console.error('Error:', err);
  } finally {
    await cdp.close();
  }
})();
