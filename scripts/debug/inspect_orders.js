const CDP = require('./cdp_helper.js');
const fs = require('fs');

async function test() {
  const cdp = new CDP(9242);
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

    const orders = await cdp.eval(`(() => {
      const w = document.querySelector('header .-w');
      return Array.from(w.children).map(c => ({
        tag: c.tagName,
        cls: c.className,
        order: window.getComputedStyle(c).order,
        pos: window.getComputedStyle(c).position,
        left: window.getComputedStyle(c).left,
        right: window.getComputedStyle(c).right,
        rect: (() => { const r = c.getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height }; })()
      }));
    })()`);
    console.log(JSON.stringify(orders, null, 2));
  } finally {
    await cdp.close();
  }
}
test();
