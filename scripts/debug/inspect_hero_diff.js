const CDP = require('./cdp_helper.js');

async function inspectHeroDifferences() {
  const cdp = new CDP(9233);
  try {
    await cdp.connect('http://localhost:3000/');
    await new Promise(r => setTimeout(r, 2000));

    async function getElementDetails(sel) {
      return await cdp.eval(`(() => {
        const el = document.querySelector('${sel}');
        if (!el) return null;
        const cs = window.getComputedStyle(el);
        const rect = el.getBoundingClientRect();
        return {
          classes: el.className,
          inlineStyle: el.getAttribute('style'),
          top: Math.round(rect.top),
          left: Math.round(rect.left),
          transform: cs.transform,
          translate: cs.translate,
          scale: cs.scale,
          marginTop: cs.marginTop,
          marginBottom: cs.marginBottom,
          paddingTop: cs.paddingTop,
          paddingBottom: cs.paddingBottom,
          alignSelf: cs.alignSelf,
          justifySelf: cs.justifySelf,
          gridArea: cs.gridArea,
          gridRow: cs.gridRow,
          gridColumn: cs.gridColumn,
          htmlClasses: document.documentElement.className,
          bodyClasses: document.body.className
        };
      })()`);
    }

    console.log('--- INITIAL DETAILS ---');
    console.log('stone:', await getElementDetails('.c-welcome .-w .stone'));
    console.log('places:', await getElementDetails('.c-welcome .-w .places'));
    console.log('l1m:', await getElementDetails('.c-welcome .-w .line-1-m'));

    // Scroll down and back up
    await cdp.eval(`window.scrollBy({ top: 1500, behavior: 'instant' })`);
    await new Promise(r => setTimeout(r, 500));
    await cdp.eval(`window.scrollBy({ top: -1500, behavior: 'instant' })`);
    await new Promise(r => setTimeout(r, 1500));

    console.log('\n--- AFTER SCROLL DOWN & BACK UP ---');
    console.log('stone:', await getElementDetails('.c-welcome .-w .stone'));
    console.log('places:', await getElementDetails('.c-welcome .-w .places'));
    console.log('l1m:', await getElementDetails('.c-welcome .-w .line-1-m'));

  } finally {
    await cdp.close();
  }
}

inspectHeroDifferences().catch(console.error);
