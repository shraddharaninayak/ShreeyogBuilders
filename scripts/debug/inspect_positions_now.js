const CDP = require('./cdp_helper.js');

async function test() {
  const cdp = new CDP(9238);
  try {
    await cdp.connect('http://localhost:3000/');
    await new Promise(r => setTimeout(r, 3500));

    const res = await cdp.eval(`(() => {
      const l = document.querySelector('header .-nl');
      const m = document.querySelector('header .menu-wrap');
      const lr = l ? l.getBoundingClientRect() : null;
      const mr = m ? m.getBoundingClientRect() : null;
      return {
        logo: lr ? { x: lr.x, y: lr.y, w: lr.width, h: lr.height } : null,
        menu: mr ? { x: mr.x, y: mr.y, w: mr.width, h: mr.height } : null
      };
    })()`);
    console.log('DOM positions:', res);
  } finally {
    await cdp.close();
  }
}
test();
