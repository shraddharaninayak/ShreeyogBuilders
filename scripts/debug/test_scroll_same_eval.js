const CDP = require('./cdp_helper');

async function main() {
  const cdp = new CDP(9457);
  try {
    await cdp.connect('http://localhost:3000/');
    await new Promise(r => setTimeout(r, 2000));

    const res = await cdp.eval(`
      (() => {
        window.scrollTo(0, 6500);
        const seq = document.querySelector('.c-objects .sequence');
        const s1 = document.querySelector('.c-objects .sticky-container-1');
        const s2 = document.querySelector('.c-objects .sticky-container-2');
        const title = document.querySelector('.c-objects .sticky-container-1 .title');
        
        return {
          scrollY: window.scrollY,
          seqTop: Math.round(seq.getBoundingClientRect().top),
          s1Top: Math.round(s1.getBoundingClientRect().top),
          s2Top: Math.round(s2.getBoundingClientRect().top),
          titleTop: title ? Math.round(title.getBoundingClientRect().top) : null
        };
      })()
    `);
    console.log('Result at 6500 in same eval:', res);
  } catch (e) {
    console.error(e);
  } finally {
    await cdp.close();
  }
}
main();
