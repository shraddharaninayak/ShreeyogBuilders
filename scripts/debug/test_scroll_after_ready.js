const CDP = require('./cdp_helper');

async function main() {
  const cdp = new CDP(9532);
  try {
    await cdp.connect('http://localhost:3000/');
    
    // Wait for -ready class
    await new Promise(r => setTimeout(r, 1000));
    console.log('Waiting for -ready and -loaded classes...');
    for (let i = 0; i < 40; i++) {
      const cls = await cdp.eval('document.documentElement.className');
      if (cls && cls.includes('-ready') && cls.includes('-loaded')) {
        console.log(`Page ready after ${i * 100}ms! Classes: ${cls}`);
        break;
      }
      await new Promise(r => setTimeout(r, 100));
    }

    // Now trace scroll in steps of 500
    console.log('Scrolling through page in increments of 500...');
    for (let y = 0; y <= 14000; y += 500) {
      await cdp.eval(`window.scrollTo(0, ${y})`);
      await new Promise(r => setTimeout(r, 100));

      const status = await cdp.eval(`
        (() => {
          const imgs = Array.from(document.querySelectorAll('.c-objects .object-wrapper img'));
          const loaded = imgs.filter(img => img.classList.contains('-loaded')).length;
          const inview = imgs.filter(img => img.classList.contains('-inview')).length;
          const srcs = imgs.map(img => img.src.slice(0, 20));
          return { y: window.scrollY, loaded, inview, srcs };
        })()
      `);

      if (status.loaded > 0 || status.inview > 0 || y % 2000 === 0) {
        console.log(JSON.stringify(status));
      }
    }

    await cdp.screenshot('C:\\Users\\supri\\.gemini\\antigravity\\brain\\ff998ab5-1a3d-42c3-84d4-6774c67af56b\\shreeyog_cards_active.png');
    console.log('Saved shreeyog_cards_active.png');

  } finally {
    await cdp.close();
  }
}
main();
