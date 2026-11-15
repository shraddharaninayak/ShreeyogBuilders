const CDP = require('./cdp_helper');

async function main() {
  const cdp = new CDP(9512);
  try {
    await cdp.connect('http://localhost:3000/');
    await new Promise(r => setTimeout(r, 2000));

    // Scroll down to 9200
    await cdp.eval('window.scrollTo(0, 9200)');
    await new Promise(r => setTimeout(r, 800));

    const stringObjects = await cdp.eval(`
      (() => {
        // Find $stringTune or string engine on window
        const win = window;
        // Let's inspect all string objects for the images
        const imgs = Array.from(document.querySelectorAll('.c-objects .object-wrapper img'));
        // Does img have __stringObject or similar?
        return imgs.map((img, i) => {
          const keys = Object.keys(img);
          const syms = Object.getOwnPropertySymbols(img).map(s => s.toString());
          return {
            i,
            src: img.src.slice(0, 50),
            classes: img.className,
            dataset: Object.assign({}, img.dataset)
          };
        });
      })()
    `);
    console.log('STRING OBJECTS ON CARDS:', stringObjects);
  } catch (e) {
    console.error(e);
  } finally {
    await cdp.close();
  }
}
main();
