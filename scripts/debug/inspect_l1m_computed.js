const CDP = require('./cdp_helper.js');

async function inspectL1m() {
  const cdp = new CDP(9233);
  try {
    await cdp.connect('http://localhost:3000/');
    await new Promise(r => setTimeout(r, 2500));
    const r = await cdp.eval(`(() => {
      const el = document.querySelector('.c-welcome .-w .line-1-m');
      const cs = window.getComputedStyle(el);
      return {
        gridColumn: cs.gridColumn,
        gridRow: cs.gridRow,
        justifySelf: cs.justifySelf,
        marginTop: cs.marginTop,
        left: el.getBoundingClientRect().left
      };
    })()`);
    console.log('Current L1M computed properties:', r);
  } finally {
    await cdp.close();
  }
}

inspectL1m().catch(console.error);
