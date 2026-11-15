const CDP = require('./cdp_helper.js');

async function test() {
  const cdp = new CDP(9254);
  try {
    await cdp.connect('http://localhost:3000/');
    await new Promise(r => setTimeout(r, 3500));
    const info = await cdp.eval(`(() => {
      const btn = document.querySelector('header .menu.button');
      const text = btn ? btn.querySelector('.text') : null;
      const csT = window.getComputedStyle(text);
      return {
        display: csT.display,
        flexWrap: csT.flexWrap,
        flexDirection: csT.flexDirection,
        width: csT.width,
        maxWidth: csT.maxWidth,
        whiteSpace: csT.whiteSpace,
        overflow: csT.overflow
      };
    })()`);
    console.log(JSON.stringify(info, null, 2));
  } finally {
    await cdp.close();
  }
}
test();
