const CDP = require('./cdp_helper.js');

async function checkPixel() {
  const cdp = new CDP(9267);
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

    const pointInfo = await cdp.eval(`(() => {
      const el = document.elementFromPoint(100, 420);
      let cur = el;
      const stack = [];
      while (cur && cur !== document.body && cur !== document.documentElement) {
        stack.push({
          tag: cur.tagName,
          id: cur.id,
          class: cur.className,
          bg: window.getComputedStyle(cur).backgroundColor,
          clip: window.getComputedStyle(cur).clipPath,
          mask: window.getComputedStyle(cur).maskImage,
          opacity: window.getComputedStyle(cur).opacity
        });
        cur = cur.parentElement;
      }
      return { el: el ? el.outerHTML.slice(0, 200) : null, stack };
    })()`);

    console.log('POINT INFO AT (100, 420):');
    console.log(JSON.stringify(pointInfo, null, 2));

  } finally {
    await cdp.close();
  }
}

checkPixel();
