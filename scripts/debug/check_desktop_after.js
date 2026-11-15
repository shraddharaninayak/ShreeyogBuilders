const CDP = require('./cdp_helper.js');

const ARTIFACT_DIR = 'C:/Users/supri/.gemini/antigravity/brain/052d3503-3ffa-4c2b-b51f-0571d6a9d35d';

async function checkDesktopAfter() {
  const cdp = new CDP(9256);
  try {
    await cdp.connect('http://localhost:3000/');
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
      window.scrollTo(0, document.documentElement.scrollHeight);
    })()`);
    await new Promise(r => setTimeout(r, 1000));
    await cdp.screenshot(`${ARTIFACT_DIR}/desktop_footer_after_section.png`);
    console.log('Saved desktop_footer_after_section.png');
  } finally {
    await cdp.close();
  }
}

checkDesktopAfter();
