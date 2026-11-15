const CDP = require('./cdp_helper.js');
const fs = require('fs');

async function test() {
  const cdp = new CDP(9227);
  try {
    await cdp.connect('http://localhost:3000/');
    await new Promise(r => setTimeout(r, 3500));

    // Check state at top (scrollY = 0)
    let state = await cdp.eval(`(() => {
      const h = document.querySelector('header');
      return {
        scrollY: window.scrollY,
        className: h.className,
        bg: window.getComputedStyle(h).background
      };
    })()`);
    console.log('State at top:', state);

    // Scroll down to 1000px
    await cdp.eval(`window.scrollTo(0, 1000)`);
    await new Promise(r => setTimeout(r, 800));

    state = await cdp.eval(`(() => {
      const h = document.querySelector('header');
      return {
        scrollY: window.scrollY,
        className: h.className,
        bg: window.getComputedStyle(h).background
      };
    })()`);
    console.log('State at scrollY = 1000 (down):', state);

    let res = await cdp.send('Page.captureScreenshot', { format: 'png', clip: { x: 0, y: 0, width: 1440, height: 100, scale: 1 } });
    fs.writeFileSync('C:/Users/supri/.gemini/antigravity/brain/ff998ab5-1a3d-42c3-84d4-6774c67af56b/scrolled_down_navbar.png', Buffer.from(res.data, 'base64'));

    // Scroll further down to 1500px, then back up to 800px
    await cdp.eval(`window.scrollTo(0, 1500)`);
    await new Promise(r => setTimeout(r, 500));
    await cdp.eval(`window.scrollTo(0, 800)`);
    await new Promise(r => setTimeout(r, 800));

    state = await cdp.eval(`(() => {
      const h = document.querySelector('header');
      return {
        scrollY: window.scrollY,
        className: h.className,
        bg: window.getComputedStyle(h).background
      };
    })()`);
    console.log('State at scrollY = 800 (scrolled back up):', state);

    res = await cdp.send('Page.captureScreenshot', { format: 'png', clip: { x: 0, y: 0, width: 1440, height: 100, scale: 1 } });
    fs.writeFileSync('C:/Users/supri/.gemini/antigravity/brain/ff998ab5-1a3d-42c3-84d4-6774c67af56b/scrolled_up_navbar.png', Buffer.from(res.data, 'base64'));
  } finally {
    await cdp.close();
  }
}
test();
