const CDP = require('./cdp_helper');

async function main() {
  const cdp = new CDP(9515);
  try {
    await cdp.connect('http://localhost:3000/test-orig/');
    await new Promise(r => setTimeout(r, 2000));

    // Scroll to 9200
    for (let y = 0; y <= 9200; y += 1000) {
      await cdp.eval(`window.scrollTo(0, ${y})`);
      await new Promise(r => setTimeout(r, 100));
    }
    await new Promise(r => setTimeout(r, 1000));

    const cardImgs = await cdp.eval(`
      (() => {
        const imgs = Array.from(document.querySelectorAll('.c-objects .object-wrapper img')).map((img, i) => ({
          i,
          src: img.src ? img.src.slice(0, 60) : '',
          classes: img.className
        }));
        return imgs;
      })()
    `);
    console.log('TEST-ORIG CARD IMAGES:', cardImgs);
  } catch (e) {
    console.error(e);
  } finally {
    await cdp.close();
  }
}
main();
