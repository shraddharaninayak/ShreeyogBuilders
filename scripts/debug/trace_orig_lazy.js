const CDP = require('./cdp_helper');

async function main() {
  const cdp = new CDP(9520);
  try {
    await cdp.connect('http://localhost:3000/');
    await new Promise(r => setTimeout(r, 2000));

    console.log('SCROLLING TEST-ORIG FROM 0 TO 14000:');
    for (let y = 0; y <= 14000; y += 500) {
      await cdp.eval(`window.scrollTo(0, ${y})`);
      await new Promise(r => setTimeout(r, 80));
      const status = await cdp.eval(`
        (() => {
          const imgs = Array.from(document.querySelectorAll('.c-objects .object-wrapper img'));
          const loaded = imgs.filter(img => img.classList.contains('-loaded')).length;
          const inview = imgs.filter(img => img.classList.contains('-inview')).length;
          return { y: window.scrollY, loaded, inview, firstSrc: imgs[0].src.slice(0, 15) };
        })()
      `);
      if (status.loaded > 0 || status.inview > 0 || y % 2000 === 0) {
        console.log(status);
      }
    }
  } finally {
    await cdp.close();
  }
}
main();
