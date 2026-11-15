const fs = require('fs');

// We have CDP already, let's take a screenshot of just the figure or inspect it
const CDP = require('./cdp_helper.js');

async function inspectFig() {
  const cdp = new CDP(9267);
  try {
    await cdp.connect('http://localhost:3000/about');
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false
    });
    await new Promise(r => setTimeout(r, 1500));

    // Capture screenshot of current desktop view
    await cdp.screenshot('C:/Users/supri/.gemini/antigravity/brain/052d3503-3ffa-4c2b-b51f-0571d6a9d35d/desktop_about_current.png');
    console.log('Saved desktop_about_current.png');
  } finally {
    await cdp.close();
  }
}

inspectFig();
