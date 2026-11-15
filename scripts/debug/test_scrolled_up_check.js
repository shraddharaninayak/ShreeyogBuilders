const CDP = require('./cdp_helper.js');
const fs = require('fs');

async function test() {
  const cdp = new CDP(9234);
  try {
    await cdp.connect('http://localhost:3000/');
    await new Promise(r => setTimeout(r, 3500));

    // Load test CSS from test_new_navbar_css.js
    const testScript = fs.readFileSync('scripts/debug/test_new_navbar_css.js', 'utf8');
    const cssMatch = testScript.match(/const testCss = `([\s\S]*?)`;/);
    const testCss = cssMatch[1];

    await cdp.eval(`(() => {
      const style = document.createElement('style');
      style.id = 'shreeyog-test-navbar-style';
      style.textContent = ${JSON.stringify(testCss)};
      document.head.appendChild(style);
      window.scrollTo(0, 800);
      const h = document.querySelector('header');
      h.classList.add('-scrolled-up');
    })()`);
    await new Promise(r => setTimeout(r, 500));

    const check = await cdp.eval(`(() => {
      const h = document.querySelector('header');
      const w = document.querySelector('header .-w');
      const l = document.querySelector('header .-nl');
      const p = document.querySelector('header .places');
      const s = document.querySelector('header .sep');
      const o = document.querySelector('header .objects');
      const m = document.querySelector('header .menu-wrap');
      return {
        header: {
          bg: window.getComputedStyle(h).backgroundColor,
          color: window.getComputedStyle(h).color,
          display: window.getComputedStyle(h).display,
          opacity: window.getComputedStyle(h).opacity,
          rect: (() => { const r = h.getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height }; })()
        },
        w: {
          transform: window.getComputedStyle(w).transform,
          rect: (() => { const r = w.getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height }; })()
        },
        places: {
          color: window.getComputedStyle(p).color,
          bg: window.getComputedStyle(p).backgroundColor,
          rect: (() => { const r = p.getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height }; })()
        },
        menu: {
          color: window.getComputedStyle(m.querySelector('.menu.button')).color,
          bg: window.getComputedStyle(m.querySelector('.menu.button')).backgroundColor,
          rect: (() => { const r = m.getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height }; })()
        }
      };
    })()`);
    console.log(JSON.stringify(check, null, 2));

    const clip = { x: 0, y: 0, width: 1440, height: 80, scale: 1 };
    const shot = await cdp.send('Page.captureScreenshot', { format: 'png', clip });
    fs.writeFileSync('C:/Users/supri/.gemini/antigravity/brain/ff998ab5-1a3d-42c3-84d4-6774c67af56b/scrolled_up_check.png', Buffer.from(shot.data, 'base64'));
  } finally {
    await cdp.close();
  }
}
test();
