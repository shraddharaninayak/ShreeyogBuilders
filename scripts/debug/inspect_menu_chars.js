const CDP = require('./cdp_helper.js');

async function test() {
  const cdp = new CDP(9251);
  try {
    await cdp.connect('http://localhost:3000/');
    await new Promise(r => setTimeout(r, 3500));
    const res = await cdp.eval(`(() => {
      const btn = document.querySelector('header .menu.button');
      const text = btn ? btn.querySelector('.text') : null;
      const chars = text ? Array.from(text.querySelectorAll('.-s-char')).map(c => {
        const r = c.getBoundingClientRect();
        return { t: c.textContent, x: r.x, y: r.y, w: r.width, h: r.height };
      }) : [];
      return chars;
    })()`);
    console.log(JSON.stringify(res, null, 2));
  } finally {
    await cdp.close();
  }
}
test();
