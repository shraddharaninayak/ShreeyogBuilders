const CDP = require('./cdp_helper.js');

async function checkMobileGrid() {
  const cdp = new CDP(9233);
  try {
    await cdp.connect('http://localhost:3000/');
    await cdp.send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
    await new Promise(r => setTimeout(r, 1000));
    const r = await cdp.eval(`(() => {
      const w = document.querySelector('.c-welcome .-w');
      return {
        rows: window.getComputedStyle(w).gridTemplateRows,
        cols: window.getComputedStyle(w).gridTemplateColumns
      };
    })()`);
    console.log('Mobile Grid:', r);
  } finally {
    await cdp.close();
  }
}

checkMobileGrid().catch(console.error);
