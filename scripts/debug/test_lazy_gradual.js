const CDP = require('./cdp_helper');

async function main() {
  const cdp = new CDP(9505);
  try {
    await cdp.connect('http://localhost:3000/');
    await new Promise(r => setTimeout(r, 2000));

    // Scroll to 9200 with smooth increments
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
          stringLazy: img.getAttribute('string-lazy'),
          classes: img.className,
          naturalWidth: img.naturalWidth,
          naturalHeight: img.naturalHeight,
          parentAspect: img.closest('figure')?.style.getPropertyValue('--aspect') || ''
        }));
        return imgs;
      })()
    `);
    console.log('CARD IMAGES AFTER GRADUAL SCROLL:');
    console.log(JSON.stringify(cardImgs, null, 2));

    await cdp.screenshot('C:\\Users\\supri\\.gemini\\antigravity\\brain\\ff998ab5-1a3d-42c3-84d4-6774c67af56b\\gradual_scroll_9200.png');
    console.log('Saved gradual_scroll_9200.png');
  } catch (e) {
    console.error(e);
  } finally {
    await cdp.close();
  }
}
main();
