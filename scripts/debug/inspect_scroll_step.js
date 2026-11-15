const CDP = require('./cdp_helper.js');

async function debugWelcomeAt2000() {
  const cdp = new CDP(9233);
  try {
    await cdp.connect('http://localhost:3000/');
    await new Promise(r => setTimeout(r, 2000));

    // Scroll by 100px steps from 1400 to 2200 and see exactly when and why it stops updating
    for (let y = 1400; y <= 2200; y += 100) {
      await cdp.eval(`window.scrollTo(0, ${y})`);
      await new Promise(r => setTimeout(r, 200));
      const info = await cdp.eval(`(() => {
        const welcome = document.querySelector('.c-welcome');
        const l2 = document.querySelector('.c-welcome .-w span.line-2');
        return {
          scrollY: window.scrollY,
          welcomeClass: welcome.className,
          welcomeInview: welcome.classList.contains('-inview'),
          welcomeRect: welcome.getBoundingClientRect(),
          l2Style: l2.getAttribute('style')
        };
      })()`);
      console.log(`Scroll ${y}:`, info);
    }

    // Now test scrolling back up from 2200 to 0 in 100px steps
    console.log('\n--- SCROLLING BACK UP STEP BY STEP ---');
    for (let y = 2100; y >= 0; y -= 100) {
      await cdp.eval(`window.scrollTo(0, ${y})`);
      await new Promise(r => setTimeout(r, 100));
      const info = await cdp.eval(`(() => {
        const welcome = document.querySelector('.c-welcome');
        const l2 = document.querySelector('.c-welcome .-w span.line-2');
        return {
          scrollY: window.scrollY,
          welcomeClass: welcome.className,
          l2Style: l2.getAttribute('style')
        };
      })()`);
      if (y % 300 === 0 || y === 0) {
        console.log(`Scroll back ${y}:`, info);
      }
    }

  } finally {
    await cdp.close();
  }
}

debugWelcomeAt2000().catch(console.error);
