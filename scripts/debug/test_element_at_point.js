const CDP = require('./cdp_helper.js');

async function elementFromPoint() {
  const cdp = new CDP(9265);
  try {
    await cdp.connect('http://localhost:3000/about');
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true
    });
    await new Promise(r => setTimeout(r, 2000));

    // Inject CSS
    const fs = require('fs');
    // Scroll to brief
    await cdp.eval(`(() => {
      const brief = document.querySelector('.c-brief');
      if (brief) brief.scrollIntoView({ behavior: 'instant', block: 'start' });
    })()`);
    await new Promise(r => setTimeout(r, 600));

    const elInfo = await cdp.eval(`(() => {
      const el = document.elementFromPoint(195, 450);
      return {
        tag: el ? el.tagName : null,
        className: el ? el.className : null,
        id: el ? el.id : null,
        outerHTML: el ? el.outerHTML.slice(0, 300) : null
      };
    })()`);

    console.log('ELEMENT AT POINT (195, 450):');
    console.log(JSON.stringify(elInfo, null, 2));

  } finally {
    await cdp.close();
  }
}

elementFromPoint();
