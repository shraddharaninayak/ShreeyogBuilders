const CDP = require('./cdp_helper.js');
const fs = require('fs');

async function test() {
  const cdp = new CDP(9233);
  try {
    await cdp.connect('http://localhost:3000/');
    await new Promise(r => setTimeout(r, 3500));

    await cdp.eval(`(() => {
      window.scrollTo(0, 800);
    })()`);
    await new Promise(r => setTimeout(r, 500));

    const res = await cdp.eval(`(() => {
      const h = document.querySelector('header');
      const b = h.getBoundingClientRect();
      const p = document.querySelector('header .places').getBoundingClientRect();
      const m = document.querySelector('header .menu-wrap').getBoundingClientRect();
      return {
        headerBox: { x: b.x, y: b.y, w: b.width, h: b.height },
        placesBox: { x: p.x, y: p.y, w: p.width, h: p.height },
        menuBox: { x: m.x, y: m.y, w: m.width, h: m.height }
      };
    })()`);
    console.log(res);

    const shot = await cdp.send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('C:/Users/supri/.gemini/antigravity/brain/ff998ab5-1a3d-42c3-84d4-6774c67af56b/full_at_800.png', Buffer.from(shot.data, 'base64'));
  } finally {
    await cdp.close();
  }
}
test();
