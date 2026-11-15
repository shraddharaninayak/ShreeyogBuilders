const CDP = require('./cdp_helper');

async function main() {
  const cdp = new CDP(9449);
  try {
    await cdp.connect('http://localhost:3000/test-orig/');
    await new Promise(r => setTimeout(r, 2500));

    // Scroll to c-objects
    const data = await cdp.eval(`
      (() => {
        const cObj = document.querySelector('.c-objects');
        if (!cObj) return { error: 'no cObj' };
        const seq = document.querySelector('.c-objects .sequence');
        const w = document.querySelector('.c-objects .-w');
        const s1 = document.querySelector('.c-objects .sticky-container-1');
        const s2 = document.querySelector('.c-objects .sticky-container-2');
        
        const top0 = cObj.getBoundingClientRect().top + window.scrollY;
        
        // Let's scroll into sticky-container-1
        window.scrollTo(0, top0 + 1000);
        const rSeq1 = seq.getBoundingClientRect();
        
        // Scroll into sticky-container-2
        window.scrollTo(0, top0 + 4000);
        const rSeq2 = seq.getBoundingClientRect();

        return {
          top0,
          scrollY1: top0 + 1000,
          seqAt1: { top: Math.round(rSeq1.top), height: Math.round(rSeq1.height) },
          scrollY2: top0 + 4000,
          seqAt2: { top: Math.round(rSeq2.top), height: Math.round(rSeq2.height) },
          seqStyle: {
            position: getComputedStyle(seq).position,
            top: getComputedStyle(seq).top,
            gridRow: getComputedStyle(seq).gridRow,
            alignSelf: getComputedStyle(seq).alignSelf
          },
          wStyle: {
            display: getComputedStyle(w).display,
            gridTemplateRows: getComputedStyle(w).gridTemplateRows
          }
        };
      })()
    `);
    console.log('ORIGINAL OBSIDIAN BEHAVIOR:');
    console.log(JSON.stringify(data, null, 2));
  } catch (e) {
    console.error(e);
  } finally {
    await cdp.close();
  }
}
main();
