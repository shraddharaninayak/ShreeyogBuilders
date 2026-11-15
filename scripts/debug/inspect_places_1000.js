const CDP = require('./cdp_helper.js');

async function test() {
  const cdp = new CDP(9229);
  try {
    await cdp.connect('http://localhost:3000/');
    await new Promise(r => setTimeout(r, 2000));
    await cdp.send('Emulation.setDeviceMetricsOverride', { width: 1000, height: 700, deviceScaleFactor: 1, mobile: false });
    await new Promise(r => setTimeout(r, 500));
    const res = await cdp.eval(`(() => {
      const h = document.querySelector('header');
      return h ? h.innerHTML : 'No header';
    })()`);
    console.log(res);
  } finally {
    await cdp.close();
  }
}
test();
