const CDP = require('./cdp_helper.js');

async function inspectSubtitleLines() {
  const cdp = new CDP(9266);
  try {
    await cdp.connect('http://localhost:3000/about');
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true
    });
    await new Promise(r => setTimeout(r, 2000));

    // Scroll to brief
    await cdp.eval(`(() => {
      const brief = document.querySelector('.c-brief');
      if (brief) brief.scrollIntoView({ behavior: 'instant', block: 'start' });
    })()`);
    await new Promise(r => setTimeout(r, 600));

    const subtitleInfo = await cdp.eval(`(() => {
      const sub = document.querySelector('.c-brief .-w .subtitle');
      if (!sub) return null;
      return {
        innerHTML: sub.innerHTML,
        children: Array.from(sub.children).map(c => ({
          tag: c.tagName,
          className: c.className,
          text: c.textContent,
          cs: {
            color: window.getComputedStyle(c).color,
            bg: window.getComputedStyle(c).backgroundColor,
            display: window.getComputedStyle(c).display,
            visibility: window.getComputedStyle(c).visibility,
            opacity: window.getComputedStyle(c).opacity
          }
        }))
      };
    })()`);

    console.log('SUBTITLE INFO:');
    console.log(JSON.stringify(subtitleInfo, null, 2));

  } finally {
    await cdp.close();
  }
}

inspectSubtitleLines();
