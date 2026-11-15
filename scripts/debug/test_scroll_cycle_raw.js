const CDP = require('./cdp_helper.js');

async function testScrollCycleRaw() {
  const cdp = new CDP(9233);
  try {
    console.log('Connecting to http://localhost:3000/ ...');
    await cdp.connect('http://localhost:3000/');
    await new Promise(r => setTimeout(r, 2000));

    // Scroll down to 2000
    console.log('Scrolling down...');
    await cdp.eval(`window.scrollTo(0, 2000)`);
    await new Promise(r => setTimeout(r, 1000));

    console.log('Scrolling back up to 0...');
    await cdp.eval(`window.scrollTo(0, 0)`);
    await new Promise(r => setTimeout(r, 1000));

    const metrics = await cdp.eval(`(() => {
      const l2 = document.querySelector('.c-welcome .-w span.line-2');
      const l3 = document.querySelector('.c-welcome .-w span.line-3');
      const l1m = document.querySelector('.c-welcome .-w .line-1-m');
      const l2m = document.querySelector('.c-welcome .-w .line-2-m');
      const stone = document.querySelector('.c-welcome .-w .stone');

      function info(el) {
        if (!el) return null;
        const r = el.getBoundingClientRect();
        const cs = window.getComputedStyle(el);
        return {
          top: Math.round(r.top),
          left: Math.round(r.left),
          transform: cs.transform,
          progressVar: cs.getPropertyValue('--progress')
        };
      }

      return {
        scrollY: window.scrollY,
        line2: info(l2),
        line3: info(l3),
        line1m: info(l1m),
        line2m: info(l2m),
        stone: info(stone)
      };
    })()`);

    console.log('Metrics after scroll down and back up:');
    console.log(JSON.stringify(metrics, null, 2));

  } finally {
    await cdp.close();
  }
}

testScrollCycleRaw().catch(console.error);
