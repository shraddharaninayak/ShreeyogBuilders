const CDP = require('./cdp_helper.js');
const fs = require('fs');

const ARTIFACT_DIR = 'C:/Users/supri/.gemini/antigravity/brain/ff998ab5-1a3d-42c3-84d4-6774c67af56b';

async function test1024() {
  const cdp = new CDP(9233);
  try {
    await cdp.connect('http://localhost:3000/');
    await new Promise(r => setTimeout(r, 2000));

    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: 1024,
      height: 768,
      deviceScaleFactor: 1,
      mobile: false
    });
    await new Promise(r => setTimeout(r, 1000));

    await cdp.screenshot(`${ARTIFACT_DIR}/hero_1024_initial.png`);
    console.log('Saved hero_1024_initial.png');

    // Scroll down and back up at 1024
    await cdp.eval(`window.scrollBy({ top: 1500, behavior: 'instant' })`);
    await new Promise(r => setTimeout(r, 500));
    await cdp.eval(`window.scrollBy({ top: -1500, behavior: 'instant' })`);
    await new Promise(r => setTimeout(r, 1500));

    await cdp.screenshot(`${ARTIFACT_DIR}/hero_1024_back_at_top.png`);
    console.log('Saved hero_1024_back_at_top.png');

  } finally {
    await cdp.close();
  }
}

test1024().catch(console.error);
