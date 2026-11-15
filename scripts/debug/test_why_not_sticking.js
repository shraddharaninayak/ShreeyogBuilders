const CDP = require('./cdp_helper');

async function main() {
  const cdp = new CDP(9446);
  try {
    await cdp.connect('http://localhost:3000/');
    await new Promise(r => setTimeout(r, 2000));

    const check = await cdp.eval(`
      (() => {
        const seq = document.querySelector('.c-objects .sequence');
        const cs = getComputedStyle(seq);
        return {
          position: cs.position,
          top: cs.top,
          inset: cs.inset,
          zIndex: cs.zIndex,
          cssText: seq.style.cssText
        };
      })()
    `);
    console.log('Computed sequence style:', check);

    // Let's test setting position: sticky on an element inside a plain page
    // What if we set seq to position: fixed when .c-objects is in view?
    // Let's test what happens when seq has position: fixed, top: 0, left: 0, width: 100vw, height: 100vh
  } catch (e) {
    console.error(e);
  } finally {
    await cdp.close();
  }
}
main();
