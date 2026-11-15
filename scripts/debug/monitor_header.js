const CDP = require('./cdp_helper.js');

async function test() {
  const cdp = new CDP(9226);
  try {
    await cdp.connect('http://localhost:3000/');
    for (let t = 0; t <= 5; t++) {
      await new Promise(r => setTimeout(r, 1000));
      const res = await cdp.eval(`({
        time: ${t + 1},
        htmlClass: document.documentElement.className,
        wTransform: window.getComputedStyle(document.querySelector('header .-w')).transform,
        headerClass: document.querySelector('header').className
      })`);
      console.log(res);
    }
  } finally {
    await cdp.close();
  }
}
test();
