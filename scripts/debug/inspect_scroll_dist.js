const CDP = require('./cdp_helper.js');

async function testScrollDistances() {
  const cdp = new CDP(9233);
  try {
    await cdp.connect('http://localhost:3000/');
    await new Promise(r => setTimeout(r, 2000));

    async function checkState(label) {
      const res = await cdp.eval(`(() => {
        const l2 = document.querySelector('.c-welcome .-w span.line-2');
        const welcome = document.querySelector('.c-welcome');
        return {
          scrollY: window.scrollY,
          welcomeClass: welcome.className,
          l2Style: l2.getAttribute('style'),
          l2Transform: window.getComputedStyle(l2).transform
        };
      })()`);
      console.log(label, res);
    }

    await checkState('Initial:');

    for (const dist of [500, 1000, 1500, 2000, 3000, 5000]) {
      console.log(`\n--- Testing scroll to ${dist} and back ---`);
      await cdp.eval(`window.scrollTo(0, ${dist})`);
      await new Promise(r => setTimeout(r, 500));
      await checkState(`At ${dist}:`);

      await cdp.eval(`window.scrollTo(0, 0)`);
      await new Promise(r => setTimeout(r, 800));
      await checkState(`Back at 0 from ${dist}:`);
    }

  } finally {
    await cdp.close();
  }
}

testScrollDistances().catch(console.error);
