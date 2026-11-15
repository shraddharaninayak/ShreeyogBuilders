const CDP = require('./cdp_helper.js');

const ARTIFACT_DIR = 'C:/Users/supri/.gemini/antigravity/brain/052d3503-3ffa-4c2b-b51f-0571d6a9d35d';

async function captureDesktopAbout() {
  const cdp = new CDP(9261);
  try {
    await cdp.connect('http://localhost:3000/about');
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false
    });
    await new Promise(r => setTimeout(r, 2000));
    await cdp.eval(`(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Accept'));
      if (btn) btn.click();
    })()`);
    await new Promise(r => setTimeout(r, 500));
    await cdp.screenshot(`${ARTIFACT_DIR}/desktop_about_top.png`);
    console.log('Saved desktop_about_top.png');

    // Scroll down a bit to see Our Story on desktop
    await cdp.eval('window.scrollTo(0, 600)');
    await new Promise(r => setTimeout(r, 800));
    await cdp.screenshot(`${ARTIFACT_DIR}/desktop_about_story.png`);
    console.log('Saved desktop_about_story.png');

  } finally {
    await cdp.close();
  }
}

captureDesktopAbout();
