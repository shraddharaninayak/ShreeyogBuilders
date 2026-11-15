const CDP = require('./cdp_helper');

async function main() {
  const cdp = new CDP(9508);
  try {
    await cdp.connect('http://localhost:3000/');
    await new Promise(r => setTimeout(r, 2000));

    const stringData = await cdp.eval(`
      (() => {
        const imgs = Array.from(document.querySelectorAll('.c-objects .object-wrapper img'));
        // Find string instance on window
        const winAny = window;
        // In stringTune or $nuxt or string engine
        const results = imgs.map((img, i) => {
          return {
            i,
            src: img.src,
            stringLazy: img.getAttribute('string-lazy'),
            classes: img.className,
            boundingRect: {
              top: Math.round(img.getBoundingClientRect().top),
              height: Math.round(img.getBoundingClientRect().height)
            }
          };
        });
        return results;
      })()
    `);
    console.log('STRING DATA ON IMAGES:');
    console.log(JSON.stringify(stringData, null, 2));
  } catch (e) {
    console.error(e);
  } finally {
    await cdp.close();
  }
}
main();
