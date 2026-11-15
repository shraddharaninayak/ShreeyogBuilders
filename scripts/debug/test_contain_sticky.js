const CDP = require('./cdp_helper');

async function main() {
  const cdp = new CDP(9473);
  try {
    await cdp.connect('http://localhost:3000/');
    await new Promise(r => setTimeout(r, 2000));

    const res = await cdp.eval(`
      (() => {
        // Test with contain: paint (as currently loaded)
        window.scrollTo(0, 6500);
        const title1 = document.querySelector('.c-objects .sticky-container-1 .title');
        const r1 = title1 ? title1.getBoundingClientRect().top : null;

        // Now remove contain from main
        const main = document.querySelector('main');
        main.style.contain = 'none';

        window.scrollTo(0, 6499);
        window.scrollTo(0, 6500);
        const r2 = title1 ? title1.getBoundingClientRect().top : null;

        return {
          withContainPaint: r1,
          withContainNone: r2
        };
      })()
    `);
    console.log('CONTAIN PAINT TEST:', res);
  } catch (e) {
    console.error(e);
  } finally {
    await cdp.close();
  }
}
main();
