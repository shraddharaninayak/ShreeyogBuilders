const CDP = require('./cdp_helper.js');

async function test() {
  const cdp = new CDP(9228);
  try {
    await cdp.connect('http://localhost:3000/');
    await new Promise(r => setTimeout(r, 3500));

    const viewports = [
      { name: 'desktop', w: 1440, h: 900 },
      { name: 'laptop', w: 1024, h: 768 },
      { name: 'tablet', w: 768, h: 1024 },
      { name: 'mobile', w: 375, h: 812 }
    ];

    for (const vp of viewports) {
      await cdp.send('Emulation.setDeviceMetricsOverride', {
        width: vp.w,
        height: vp.h,
        deviceScaleFactor: 1,
        mobile: vp.w < 768
      });
      await new Promise(r => setTimeout(r, 300));
      const res = await cdp.eval(`(() => {
        const h = document.querySelector('header');
        const b = h.getBoundingClientRect();
        const p = document.querySelector('header .places');
        const o = document.querySelector('header .objects');
        const m = document.querySelector('header .menu-wrap');
        const l = document.querySelector('header .-nl');
        return {
          vp: '${vp.name}',
          headerW: b.width,
          logoW: l ? l.getBoundingClientRect().width : 0,
          placesX: p ? p.getBoundingClientRect().x : 0,
          menuX: m ? m.getBoundingClientRect().x : 0
        };
      })()`);
      console.log(res);
    }
  } finally {
    await cdp.close();
  }
}
test();
