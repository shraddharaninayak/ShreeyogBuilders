const CDP = require('./cdp_helper.js');

(async () => {
  const cdp = new CDP(9241);
  try {
    await cdp.connect('http://localhost:3000/');
    await new Promise(r => setTimeout(r, 4000));

    // Disable any polluting CSS rules targeting .c-welcome from people.39d410f5.css
    console.log('--- Testing without people.39d410f5.css interference ---');
    await cdp.eval(`(() => {
      // Find any sheet that has .c-welcome without scope
      for (const sheet of document.styleSheets) {
        try {
          for (let i = sheet.cssRules.length - 1; i >= 0; i--) {
            const rule = sheet.cssRules[i];
            if (rule.selectorText && (rule.selectorText === '.c-welcome .-w' || rule.selectorText === '.c-welcome')) {
              console.log('Disabled rule:', rule.cssText);
              sheet.deleteRule(i);
            }
          }
        } catch(e) {}
      }
    })()`);

    async function getHeroState() {
      return await cdp.eval(`(() => {
        const l1 = document.querySelector('.c-welcome .-w span.line-1');
        const l2 = document.querySelector('.c-welcome .-w span.line-2');
        const l3 = document.querySelector('.c-welcome .-w span.line-3');
        const l1m = document.querySelector('.c-welcome .-w .line-1-m');
        const l2m = document.querySelector('.c-welcome .-w .line-2-m');
        const cta = document.querySelector('.c-welcome .-w .cta');
        const stone = document.querySelector('.c-welcome .-w .stone');
        const places = document.querySelector('.c-welcome .-w .places');
        const items = document.querySelector('.c-welcome .-w .items');
        const welcome = document.querySelector('.c-welcome');
        const w = document.querySelector('.c-welcome .-w');

        function p(el) {
          if (!el) return null;
          const r = el.getBoundingClientRect();
          const cs = window.getComputedStyle(el);
          return {
            top: Math.round(r.top),
            bottom: Math.round(r.bottom),
            left: Math.round(r.left),
            right: Math.round(r.right),
            transform: cs.transform,
            styleTransform: el.style.transform,
            display: cs.display,
            progress: cs.getPropertyValue('--progress')
          };
        }

        return {
          scrollY: window.scrollY,
          wDisplay: window.getComputedStyle(w).display,
          welcomeProgress: window.getComputedStyle(welcome).getPropertyValue('--progress'),
          l1: p(l1),
          l2: p(l2),
          l3: p(l3),
          l1m: p(l1m),
          l2m: p(l2m),
          cta: p(cta),
          stone: p(stone),
          places: p(places),
          items: p(items)
        };
      })()`);
    }

    const initial = await getHeroState();
    console.log('INITIAL:');
    console.log(JSON.stringify(initial, null, 2));

    for (let c = 1; c <= 5; c++) {
      console.log(`\n--- Cycle ${c}: scroll down and up ---`);
      await cdp.eval('window.scrollTo(0, 3000)');
      await new Promise(r => setTimeout(r, 600));

      await cdp.eval('window.scrollTo(0, 0)');
      await new Promise(r => setTimeout(r, 800));

      const after = await getHeroState();
      console.log(`Cycle ${c} result:`, {
        scrollY: after.scrollY,
        wDisplay: after.wDisplay,
        l1Top: after.l1.top,
        l2Top: after.l2.top,
        l3Top: after.l3.top,
        l1mTop: after.l1m.top,
        l2mTop: after.l2m.top,
        l1mLeft: after.l1m.left,
        l2mLeft: after.l2m.left,
        matchL1m: after.l1m.top === initial.l1m.top && after.l1m.left === initial.l1m.left,
        matchL2m: after.l2m.top === initial.l2m.top && after.l2m.left === initial.l2m.left
      });
    }

  } catch (err) {
    console.error('Error:', err);
  } finally {
    await cdp.close();
  }
})();
