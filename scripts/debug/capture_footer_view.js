const CDP = require('./cdp_helper.js');
const fs = require('fs');

const ARTIFACT_DIR = 'C:/Users/supri/.gemini/antigravity/brain/052d3503-3ffa-4c2b-b51f-0571d6a9d35d';

async function captureFooter() {
  const cdp = new CDP(9251);
  try {
    await cdp.connect('http://localhost:3000/');
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true
    });

    for (let i = 0; i < 30; i++) {
      const ready = await cdp.eval(`!!(document.documentElement && document.documentElement.classList.contains('-ready'))`);
      if (ready) break;
      await new Promise(r => setTimeout(r, 200));
    }
    await new Promise(r => setTimeout(r, 2000));

    // Dismiss cookie banner
    await cdp.eval(`(() => {
      const btn = document.querySelector('.c-cookies button') || document.querySelector('#cookie-accept') || Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Accept'));
      if (btn) btn.click();
    })()`);
    await new Promise(r => setTimeout(r, 500));

    // Scroll to footer .-w.after
    await cdp.eval(`(() => {
      const after = document.querySelector('footer .-w.after');
      if (after) after.scrollIntoView({ behavior: 'instant', block: 'start' });
    })()`);
    await new Promise(r => setTimeout(r, 1000));

    await cdp.screenshot(`${ARTIFACT_DIR}/mobile_footer_after_view.png`);
    console.log('Saved mobile_footer_after_view.png');

    // Scroll a bit further down to see bottom of footer
    await cdp.eval('window.scrollTo(0, document.documentElement.scrollHeight)');
    await new Promise(r => setTimeout(r, 1000));
    await cdp.screenshot(`${ARTIFACT_DIR}/mobile_footer_bottom_view.png`);
    console.log('Saved mobile_footer_bottom_view.png');

  } catch (err) {
    console.error(err);
  } finally {
    await cdp.close();
  }
}

captureFooter();
