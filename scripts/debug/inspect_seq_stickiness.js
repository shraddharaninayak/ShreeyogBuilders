const CDP = require('./cdp_helper');

async function main() {
  const cdp = new CDP(9455);
  try {
    await cdp.connect('http://localhost:3000/');
    await new Promise(r => setTimeout(r, 2000));

    // Scroll to 6500
    await cdp.eval('window.scrollTo(0, 6500)');
    await new Promise(r => setTimeout(r, 500));

    // Inspect sequence element in detail
    const res = await cdp.eval(`
      (() => {
        const seq = document.querySelector('.c-objects .sequence');
        const s = getComputedStyle(seq);
        const parent = seq.parentElement;
        const ps = getComputedStyle(parent);
        
        // Let's check getClientRects
        const rects = seq.getClientRects();
        
        return {
          seqPosition: s.position,
          seqTop: s.top,
          seqInset: s.inset,
          seqDisplay: s.display,
          seqTransform: s.transform,
          seqWillChange: s.willChange,
          seqFilter: s.filter,
          seqContain: s.contain,
          seqHeight: s.height,
          parentDisplay: ps.display,
          parentPosition: ps.position,
          parentOverflow: ps.overflow,
          parentHeight: ps.height,
          rect0: rects[0] ? {
            top: rects[0].top,
            bottom: rects[0].bottom,
            height: rects[0].height
          } : null
        };
      })()
    `);
    console.log('Sequence inspection at 6500:', JSON.stringify(res, null, 2));

  } catch (e) {
    console.error(e);
  } finally {
    await cdp.close();
  }
}
main();
