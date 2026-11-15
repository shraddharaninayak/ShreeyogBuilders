const CDP = require('./cdp_helper.js');
const fs = require('fs');

async function test() {
  const cdp = new CDP(9224);
  try {
    await cdp.connect('http://localhost:3000/');
    await new Promise(r => setTimeout(r, 3500));
    const headerBox = await cdp.eval(`(() => {
      const h = document.querySelector('header');
      const b = h.getBoundingClientRect();
      const placesEl = document.querySelector('header .places');
      const pRect = placesEl ? placesEl.getBoundingClientRect() : null;
      const objectsEl = document.querySelector('header .objects');
      const oRect = objectsEl ? objectsEl.getBoundingClientRect() : null;
      const sepEl = document.querySelector('header .sep');
      const sRect = sepEl ? sepEl.getBoundingClientRect() : null;
      const menuEl = document.querySelector('header .menu-wrap');
      const mRect = menuEl ? menuEl.getBoundingClientRect() : null;
      const logoEl = document.querySelector('header .-nl');
      const lRect = logoEl ? logoEl.getBoundingClientRect() : null;
      return {
        box: { x: b.x, y: b.y, width: b.width, height: b.height },
        logo: lRect ? { x: lRect.x, y: lRect.y, w: lRect.width, h: lRect.height } : null,
        places: pRect ? { x: pRect.x, y: pRect.y, w: pRect.width, h: pRect.height } : null,
        sep: sRect ? { x: sRect.x, y: sRect.y, w: sRect.width, h: sRect.height } : null,
        objects: oRect ? { x: oRect.x, y: oRect.y, w: oRect.width, h: oRect.height } : null,
        menu: mRect ? { x: mRect.x, y: mRect.y, w: mRect.width, h: mRect.height } : null,
        classes: h.className
      };
    })()`);
    console.log('Header elements box:', JSON.stringify(headerBox, null, 2));

    const clip = { x: 0, y: 0, width: 1440, height: 100, scale: 1 };
    const res = await cdp.send('Page.captureScreenshot', { format: 'png', clip });
    fs.writeFileSync('C:/Users/supri/.gemini/antigravity/brain/ff998ab5-1a3d-42c3-84d4-6774c67af56b/current_navbar_clip.png', Buffer.from(res.data, 'base64'));
    console.log('Header clip saved!');
  } finally {
    await cdp.close();
  }
}
test();
