const CDP = require('./cdp_helper.js');

async function inspectShreeyog() {
  const cdp = new CDP(9233);
  try {
    console.log('Connecting to http://localhost:3000/ ...');
    await cdp.connect('http://localhost:3000/');
    await new Promise(r => setTimeout(r, 2000));

    const metrics = await cdp.eval(`(() => {
      const w = document.querySelector('.c-welcome .-w');
      const l1 = document.querySelector('.c-welcome .-w span.line-1');
      const l2 = document.querySelector('.c-welcome .-w span.line-2');
      const l3 = document.querySelector('.c-welcome .-w span.line-3');
      const l1m = document.querySelector('.c-welcome .-w .line-1-m');
      const l2m = document.querySelector('.c-welcome .-w .line-2-m');
      const cta = document.querySelector('.c-welcome .-w .cta');
      const stone = document.querySelector('.c-welcome .-w .stone');
      const places = document.querySelector('.c-welcome .-w .places');
      const items = document.querySelector('.c-welcome .-w .items');
      const logo = document.querySelector('.shreeyog-brand-logo');

      function info(el) {
        if (!el) return null;
        const r = el.getBoundingClientRect();
        const cs = window.getComputedStyle(el);
        return {
          text: el.innerText.trim().replace(/\\s+/g, ' '),
          top: Math.round(r.top),
          left: Math.round(r.left),
          width: Math.round(r.width),
          height: Math.round(r.height),
          gridColumn: cs.gridColumn,
          gridRow: cs.gridRow,
          marginTop: cs.marginTop,
          fontSize: cs.fontSize,
          transform: cs.transform,
          progressVar: cs.getPropertyValue('--progress')
        };
      }

      return {
        logo: info(logo),
        line1: info(l1),
        line2: info(l2),
        line3: info(l3),
        line1m: info(l1m),
        line2m: info(l2m),
        cta: info(cta),
        stone: info(stone),
        places: info(places),
        items: info(items)
      };
    })()`);

    console.log('Shreeyog Hero Metrics at scroll 0:');
    console.log(JSON.stringify(metrics, null, 2));

  } finally {
    await cdp.close();
  }
}

inspectShreeyog().catch(console.error);
