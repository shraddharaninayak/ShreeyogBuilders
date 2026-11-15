const CDP = require('./cdp_helper');

async function main() {
  const cdp = new CDP(9447);
  try {
    await cdp.connect('http://localhost:3000/');
    await new Promise(r => setTimeout(r, 2000));

    const res = await cdp.eval(`
      (() => {
        const seq = document.querySelector('.c-objects .sequence');
        const w = document.querySelector('.c-objects .-w');
        const cObj = document.querySelector('.c-objects');
        
        return {
          seqOffsetTop: seq.offsetTop,
          seqOffsetParent: seq.offsetParent?.className,
          wOffsetTop: w.offsetTop,
          wOffsetParent: w.offsetParent?.className,
          cObjOffsetTop: cObj.offsetTop,
          cObjOffsetParent: cObj.offsetParent?.className,
          // Let's test a simple div with position: sticky inside .-w
          testDivSticky: (() => {
            const test = document.createElement('div');
            test.style.cssText = 'position: sticky; top: 0; height: 100px; background: red; z-index: 9999;';
            test.textContent = 'STICKY TEST';
            w.prepend(test);
            window.scrollTo(0, 6000);
            const r = test.getBoundingClientRect();
            test.remove();
            return { top: Math.round(r.top) };
          })()
        };
      })()
    `);
    console.log('Offset & Sticky test:', res);
  } catch (e) {
    console.error(e);
  } finally {
    await cdp.close();
  }
}
main();
