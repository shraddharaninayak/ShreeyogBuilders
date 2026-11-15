const CDP = require('./cdp_helper');

async function main() {
  const cdp = new CDP(9528);
  try {
    await cdp.connect('http://localhost:3000/');
    await new Promise(r => setTimeout(r, 2000));

    // Scroll to 8500
    await cdp.eval('window.scrollTo(0, 8500)');
    await new Promise(r => setTimeout(r, 1000));

    const res = await cdp.eval(`
      (() => {
        const imgs = Array.from(document.querySelectorAll('.c-objects .object-wrapper img')).map((img, i) => ({
          i,
          src: img.src.slice(0, 40),
          classes: img.className
        }));
        return {
          scrollY: window.scrollY,
          imgs
        };
      })()
    `);
    console.log('AT 8500 ON SHREEYOG:', JSON.stringify(res, null, 2));

    await cdp.screenshot('C:\\Users\\supri\\.gemini\\antigravity\\brain\\ff998ab5-1a3d-42c3-84d4-6774c67af56b\\shreeyog_cards_at_8500.png');
    console.log('Saved shreeyog_cards_at_8500.png');
  } finally {
    await cdp.close();
  }
}
main();
