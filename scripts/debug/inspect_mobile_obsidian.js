const CDP = require('./cdp_helper.js');

async function inspectMobileObsidian() {
  const cdp = new CDP(9233);
  try {
    await cdp.connect('http://localhost:3001/');
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true
    });
    await new Promise(r => setTimeout(r, 2000));

    const metrics = await cdp.eval(`(() => {
      const selectors = [
        '.c-welcome .-w span.line-1',
        '.c-welcome .-w span.line-2',
        '.c-welcome .-w span.line-3',
        '.c-welcome .-w .line-1-m',
        '.c-welcome .-w .line-2-m',
        '.c-welcome .-w .cta',
        '.c-welcome .-w .stone'
      ];
      const res = {};
      for (const s of selectors) {
        const el = document.querySelector(s);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        const cs = window.getComputedStyle(el);
        res[s] = {
          text: el.innerText.trim().replace(/\\s+/g, ' '),
          top: Math.round(r.top),
          left: Math.round(r.left),
          width: Math.round(r.width),
          height: Math.round(r.height),
          gridColumn: cs.gridColumn,
          gridRow: cs.gridRow,
          marginTop: cs.marginTop,
          fontSize: cs.fontSize
        };
      }
      return res;
    })()`);

    console.log('Mobile Obsidian Metrics:');
    console.log(JSON.stringify(metrics, null, 2));

  } finally {
    await cdp.close();
  }
}

inspectMobileObsidian().catch(console.error);
