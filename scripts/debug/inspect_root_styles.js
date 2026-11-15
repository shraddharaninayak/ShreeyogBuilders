const CDP = require('./cdp_helper');

async function main() {
  const cdp = new CDP(9459);
  try {
    await cdp.connect('http://localhost:3000/');
    await new Promise(r => setTimeout(r, 2000));

    const res = await cdp.eval(`
      (() => {
        const getStyles = (el) => {
          const s = getComputedStyle(el);
          return {
            overflow: s.overflow,
            overflowX: s.overflowX,
            overflowY: s.overflowY,
            position: s.position,
            contain: s.contain,
            transform: s.transform,
            perspective: s.perspective,
            filter: s.filter,
            clipPath: s.clipPath,
            height: s.height,
            maxHeight: s.maxHeight
          };
        };
        return {
          html: getStyles(document.documentElement),
          body: getStyles(document.body),
          app: getStyles(document.getElementById('ImaginePossible')),
          main: getStyles(document.querySelector('main'))
        };
      })()
    `);
    console.log('Root ancestors computed styles:');
    console.log(JSON.stringify(res, null, 2));
  } catch (e) {
    console.error(e);
  } finally {
    await cdp.close();
  }
}
main();
