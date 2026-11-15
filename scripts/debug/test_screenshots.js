const CDP = require('./cdp_helper.js');

async function testScreenshots() {
  const cdp = new CDP(9270);
  try {
    await cdp.connect('http://localhost:3000/about');
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true
    });
    await new Promise(r => setTimeout(r, 2000));

    // Capture screenshot at scrollY = 0
    await cdp.screenshot('C:/Users/supri/.gemini/antigravity/brain/052d3503-3ffa-4c2b-b51f-0571d6a9d35d/raw_about_0.png');

    // Scroll to 400
    await cdp.eval('window.scrollTo(0, 400)');
    await new Promise(r => setTimeout(r, 800));
    await cdp.screenshot('C:/Users/supri/.gemini/antigravity/brain/052d3503-3ffa-4c2b-b51f-0571d6a9d35d/raw_about_400.png');

    // Scroll to 800
    await cdp.eval('window.scrollTo(0, 800)');
    await new Promise(r => setTimeout(r, 800));
    await cdp.screenshot('C:/Users/supri/.gemini/antigravity/brain/052d3503-3ffa-4c2b-b51f-0571d6a9d35d/raw_about_800.png');

  } finally {
    await cdp.close();
  }
}

testScreenshots();
