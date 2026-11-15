const CDP = require('./cdp_helper.js');

(async () => {
  const cdp = new CDP(9237);
  try {
    await cdp.connect('http://localhost:3000/');
    await new Promise(r => setTimeout(r, 4000));

    const before = await cdp.eval(`(() => {
      return {
        htmlClasses: document.documentElement.className,
        bodyClasses: document.body.className,
        welcomeClasses: document.querySelector('.c-welcome')?.className,
        welcomeParentClasses: document.querySelector('.c-welcome')?.parentElement?.className,
        welcomeStyle: document.querySelector('.c-welcome')?.getAttribute('style'),
        wClasses: document.querySelector('.c-welcome .-w')?.className,
        wStyle: document.querySelector('.c-welcome .-w')?.getAttribute('style')
      };
    })()`);
    console.log('BEFORE MENU CLICK:', before);

    // Click Menu
    await cdp.eval(`(() => {
      const btn = document.getElementById('menuToggleBtn') || document.querySelector('.menu.button');
      if (btn) btn.click();
    })()`);
    await new Promise(r => setTimeout(r, 1000));

    const during = await cdp.eval(`(() => {
      return {
        htmlClasses: document.documentElement.className,
        bodyClasses: document.body.className,
        welcomeClasses: document.querySelector('.c-welcome')?.className,
        overlayStyle: document.getElementById('projects-menu-overlay')?.getAttribute('style')
      };
    })()`);
    console.log('DURING MENU OPEN:', during);

    // Close Menu
    await cdp.eval(`(() => {
      const closeBtn = document.getElementById('projects-menu-close-btn') || document.getElementById('projects-menu-cross-btn');
      if (closeBtn) closeBtn.click();
    })()`);
    await new Promise(r => setTimeout(r, 1000));

    const after = await cdp.eval(`(() => {
      const l1 = document.querySelector('.c-welcome .-w span.line-1');
      const l1m = document.querySelector('.c-welcome .-w .line-1-m');
      const csL1m = window.getComputedStyle(l1m);
      const csL1 = window.getComputedStyle(l1);
      const csW = window.getComputedStyle(document.querySelector('.c-welcome .-w'));

      return {
        htmlClasses: document.documentElement.className,
        bodyClasses: document.body.className,
        welcomeClasses: document.querySelector('.c-welcome')?.className,
        l1: {
          gridColumn: csL1.gridColumn,
          gridRow: csL1.gridRow,
          justifySelf: csL1.justifySelf,
          textAlign: csL1.textAlign
        },
        l1m: {
          gridColumn: csL1m.gridColumn,
          gridRow: csL1m.gridRow,
          justifySelf: csL1m.justifySelf,
          textAlign: csL1m.textAlign,
          marginTop: csL1m.marginTop,
          top: l1m.getBoundingClientRect().top,
          left: l1m.getBoundingClientRect().left
        },
        w: {
          display: csW.display,
          gridTemplateColumns: csW.gridTemplateColumns,
          gridTemplateRows: csW.gridTemplateRows
        }
      };
    })()`);
    console.log('AFTER MENU CLOSE:', JSON.stringify(after, null, 2));

  } catch (err) {
    console.error('Error:', err);
  } finally {
    await cdp.close();
  }
})();
