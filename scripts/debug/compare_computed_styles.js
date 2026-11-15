const CDP = require('./cdp_helper.js');

async function compareStyles() {
  const cdp = new CDP(9233);
  try {
    await cdp.connect('http://localhost:3000/');
    await new Promise(r => setTimeout(r, 2500));

    async function getElementSnapshot() {
      return await cdp.eval(`(() => {
        const selectors = [
          '.c-welcome',
          '.c-welcome .-w',
          '.c-welcome .-w span.line-1',
          '.c-welcome .-w span.line-2',
          '.c-welcome .-w span.line-3',
          '.c-welcome .-w .line-1-m',
          '.c-welcome .-w .line-2-m',
          '.c-welcome .-w .cta',
          '.c-welcome .-w .stone',
          '.c-welcome .-w .places',
          '.c-welcome .-w .items'
        ];

        const snap = {};
        for (const sel of selectors) {
          const el = document.querySelector(sel);
          if (!el) continue;
          const r = el.getBoundingClientRect();
          const cs = window.getComputedStyle(el);
          snap[sel] = {
            rect: { top: Math.round(r.top), left: Math.round(r.left), width: Math.round(r.width), height: Math.round(r.height) },
            classes: el.className,
            styleAttr: el.getAttribute('style'),
            transform: cs.transform,
            translate: cs.translate,
            scale: cs.scale,
            rotate: cs.rotate,
            marginTop: cs.marginTop,
            marginBottom: cs.marginBottom,
            top: cs.top,
            position: cs.position,
            gridArea: cs.gridArea,
            gridColumn: cs.gridColumn,
            gridRow: cs.gridRow,
            alignSelf: cs.alignSelf,
            justifySelf: cs.justifySelf,
            opacity: cs.opacity,
            progressVar: cs.getPropertyValue('--progress')
          };
        }
        return snap;
      })()`);
    }

    const before = await getElementSnapshot();

    // Scroll down 2500
    await cdp.eval(`window.scrollTo(0, 2500)`);
    await new Promise(r => setTimeout(r, 800));

    // Scroll back up 0
    await cdp.eval(`window.scrollTo(0, 0)`);
    await new Promise(r => setTimeout(r, 1200));

    const after = await getElementSnapshot();

    console.log('=== DIFFERENCES (INITIAL vs AFTER SCROLL BACK TO TOP) ===');
    for (const sel of Object.keys(before)) {
      const b = before[sel];
      const a = after[sel];
      const diffs = {};
      for (const prop of Object.keys(b)) {
        const bVal = JSON.stringify(b[prop]);
        const aVal = JSON.stringify(a[prop]);
        if (bVal !== aVal) {
          diffs[prop] = { before: b[prop], after: a[prop] };
        }
      }
      if (Object.keys(diffs).length > 0) {
        console.log(`\n[${sel}]:`);
        console.log(JSON.stringify(diffs, null, 2));
      } else {
        console.log(`[${sel}]: IDENTICAL ✓`);
      }
    }

  } finally {
    await cdp.close();
  }
}

compareStyles().catch(console.error);
