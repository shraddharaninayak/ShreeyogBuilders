const CDP = require('./cdp_helper.js');

(async () => {
  const cdp = new CDP(9238);
  try {
    await cdp.connect('http://localhost:3000/');
    await new Promise(r => setTimeout(r, 4000));

    // Inspect rules before
    const rulesBefore = await cdp.eval(`(() => {
      const el = document.querySelector('.c-welcome .-w');
      const cs = window.getComputedStyle(el);
      return {
        display: cs.display,
        classList: Array.from(el.classList),
        parentClassList: Array.from(el.parentElement.classList)
      };
    })()`);
    console.log('BEFORE:', rulesBefore);

    // Click menu
    await cdp.eval(`(() => {
      const btn = document.getElementById('menuToggleBtn') || document.querySelector('.menu.button');
      if (btn) btn.click();
    })()`);
    await new Promise(r => setTimeout(r, 1000));

    // Close menu
    await cdp.eval(`(() => {
      const closeBtn = document.getElementById('projects-menu-close-btn') || document.getElementById('projects-menu-cross-btn');
      if (closeBtn) closeBtn.click();
    })()`);
    await new Promise(r => setTimeout(r, 1000));

    const rulesAfter = await cdp.eval(`(() => {
      const el = document.querySelector('.c-welcome .-w');
      const cs = window.getComputedStyle(el);
      
      // Let's find which stylesheets have rules matching this element that set display
      const matchingRules = [];
      for (const sheet of document.styleSheets) {
        try {
          for (const rule of sheet.cssRules) {
            if (rule.selectorText && el.matches(rule.selectorText)) {
              if (rule.style.display || rule.cssText.includes('display')) {
                matchingRules.push({
                  selector: rule.selectorText,
                  cssText: rule.cssText,
                  href: sheet.href
                });
              }
            }
          }
        } catch (e) {}
      }

      return {
        display: cs.display,
        classList: Array.from(el.classList),
        parentClassList: Array.from(el.parentElement.classList),
        htmlClassList: Array.from(document.documentElement.classList),
        matchingRules
      };
    })()`);
    console.log('AFTER:', JSON.stringify(rulesAfter, null, 2));

  } catch (err) {
    console.error('Error:', err);
  } finally {
    await cdp.close();
  }
})();
