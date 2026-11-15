const CDP = require('./cdp_helper.js');
const sharp = require('sharp');
const fs = require('fs');

async function test() {
  const cdp = new CDP(9255);
  try {
    await cdp.connect('http://localhost:3000/');
    await new Promise(r => setTimeout(r, 3500));

    await cdp.eval(`(() => {
      const text = document.querySelector('header .menu.button .text');
      if (text) {
        text.style.setProperty('flex-wrap', 'nowrap', 'important');
        text.style.setProperty('width', 'auto', 'important');
      }
    })()`);
    await new Promise(r => setTimeout(r, 200));

    const check = await cdp.eval(`(() => {
      const text = document.querySelector('header .menu.button .text');
      const chars = Array.from(text.querySelectorAll('.-s-char')).map(c => {
        const r = c.getBoundingClientRect();
        return { t: c.textContent, x: r.x, y: r.y };
      });
      return chars;
    })()`);
    console.log('Chars after flex-wrap: nowrap:', check);

    const shot = await cdp.send('Page.captureScreenshot', { format: 'png', clip: { x: 1200, y: 10, width: 200, height: 60, scale: 1 } });
    fs.writeFileSync('C:/Users/supri/.gemini/antigravity/brain/ff998ab5-1a3d-42c3-84d4-6774c67af56b/menu_crop_fixed.png', Buffer.from(shot.data, 'base64'));
    console.log('Saved menu_crop_fixed.png');
  } finally {
    await cdp.close();
  }
}
test();
