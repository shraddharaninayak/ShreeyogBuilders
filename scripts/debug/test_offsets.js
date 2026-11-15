const CDP = require('./cdp_helper');

async function main() {
  const cdp = new CDP(9478);
  try {
    await cdp.connect('http://localhost:3000/');
    await new Promise(r => setTimeout(r, 2000));

    const offsets = await cdp.eval(`
      (() => {
        window.scrollTo(0, 0);
        const getOffset = el => {
          if (!el) return null;
          const r = el.getBoundingClientRect();
          return {
            top: Math.round(r.top + window.scrollY),
            height: Math.round(r.height),
            bottom: Math.round(r.top + window.scrollY + r.height)
          };
        };

        return {
          objects: getOffset(document.querySelector('.c-objects')),
          sequence: getOffset(document.querySelector('.c-objects .sequence')),
          s1: getOffset(document.querySelector('.c-objects .sticky-container-1')),
          s2: getOffset(document.querySelector('.c-objects .sticky-container-2')),
          s2Sticky: getOffset(document.querySelector('.c-objects .sticky-container-2 .sticky'))
        };
      })()
    `);
    console.log('OFFSETS AT SCROLL 0:');
    console.log(JSON.stringify(offsets, null, 2));
  } catch (e) {
    console.error(e);
  } finally {
    await cdp.close();
  }
}
main();
