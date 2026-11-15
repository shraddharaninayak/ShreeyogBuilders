const CDP = require('./cdp_helper.js');
const fs = require('fs');

async function test() {
  const cdp = new CDP(9239);
  try {
    await cdp.connect('http://localhost:3000/');
    await new Promise(r => setTimeout(r, 3500));

    const testScript = fs.readFileSync('scripts/debug/test_clip_scroll.js', 'utf8');
    const cssMatch = testScript.match(/const updatedCss = `([\s\S]*?)`;/);
    const updatedCss = cssMatch[1];

    await cdp.eval(`(() => {
      const style = document.createElement('style');
      style.id = 'shreeyog-test-navbar-style';
      style.textContent = ${JSON.stringify(updatedCss)};
      document.head.appendChild(style);
      window.scrollTo(0, 800);
      const h = document.querySelector('header');
      h.classList.add('-scrolled-up');
    })()`);
    await new Promise(r => setTimeout(r, 500));

    const info = await cdp.eval(`(() => {
      const w = document.querySelector('header .-w');
      const children = Array.from(w.children).map(c => {
        const r = c.getBoundingClientRect();
        return { tag: c.tagName, cls: c.className, x: r.x, y: r.y, w: r.width, h: r.height };
      });
      return {
        wRect: (() => { const r = w.getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height }; })(),
        children
      };
    })()`);
    console.log(JSON.stringify(info, null, 2));
  } finally {
    await cdp.close();
  }
}
test();
