const CDP = require('./cdp_helper.js');

async function test() {
  const cdp = new CDP(9252);
  try {
    await cdp.connect('http://localhost:3000/');
    await new Promise(r => setTimeout(r, 3500));
    const info = await cdp.eval(`(() => {
      const btn = document.querySelector('header .menu.button');
      const text = btn ? btn.querySelector('.text') : null;
      const chars = text ? Array.from(text.querySelectorAll('.-s-char')) : [];
      return {
        btnW: btn.getBoundingClientRect().width,
        btnH: btn.getBoundingClientRect().height,
        textW: text ? text.getBoundingClientRect().width : 0,
        textH: text ? text.getBoundingClientRect().height : 0,
        btnDisplay: window.getComputedStyle(btn).display,
        btnFlexDirection: window.getComputedStyle(btn).flexDirection,
        textDisplay: text ? window.getComputedStyle(text).display : '',
        charsDisplay: chars.map(c => window.getComputedStyle(c).display),
        charsRect: chars.map(c => {
          const r = c.getBoundingClientRect();
          return { t: c.textContent, x: r.x, y: r.y, w: r.width, h: r.height };
        })
      };
    })()`);
    console.log(JSON.stringify(info, null, 2));
  } finally {
    await cdp.close();
  }
}
test();
