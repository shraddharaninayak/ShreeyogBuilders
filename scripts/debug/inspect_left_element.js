const CDP = require('./cdp_helper.js');
const fs = require('fs');

async function test() {
  const cdp = new CDP(9241);
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

    const el = await cdp.eval(`(() => {
      const e = document.elementFromPoint(40, 35);
      return {
        tag: e ? e.tagName : null,
        cls: e ? e.className : null,
        text: e ? e.textContent : null,
        outerHTML: e ? e.outerHTML.substring(0, 150) : null
      };
    })()`);
    console.log('Element at (40, 35):', el);
  } finally {
    await cdp.close();
  }
}
test();
