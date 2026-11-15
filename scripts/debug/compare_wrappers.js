const CDP = require('./cdp_helper');

async function inspect(url, name) {
  const cdp = new CDP(9522);
  try {
    await cdp.connect(url);
    await new Promise(r => setTimeout(r, 2000));
    await cdp.eval('window.scrollTo(0, 6000)');
    await new Promise(r => setTimeout(r, 500));

    const res = await cdp.eval(`
      (() => {
        const wrappers = Array.from(document.querySelectorAll('.c-objects .object-wrapper')).map((w, i) => {
          const img = w.querySelector('img');
          const fig = w.querySelector('figure');
          const holder = w.querySelector('.object-holder');
          return {
            i,
            wHtml: w.outerHTML.slice(0, 300),
            imgHtml: img ? img.outerHTML : 'none',
            wRect: (() => { const r = w.getBoundingClientRect(); return { top: Math.round(r.top), height: Math.round(r.height), bottom: Math.round(r.bottom) }; })(),
            figRect: fig ? (() => { const r = fig.getBoundingClientRect(); return { top: Math.round(r.top), height: Math.round(r.height), bottom: Math.round(r.bottom) }; })() : null,
            imgRect: img ? (() => { const r = img.getBoundingClientRect(); return { top: Math.round(r.top), height: Math.round(r.height), bottom: Math.round(r.bottom) }; })() : null,
            imgClasses: img ? img.className : '',
            imgSrc: img ? img.src.slice(0, 30) : ''
          };
        });

        const s1 = document.querySelector('.c-objects .sticky-container-1');
        const s2 = document.querySelector('.c-objects .sticky-container-2');
        const seq = document.querySelector('.c-objects .sequence');

        return {
          scrollY: window.scrollY,
          seqTop: seq ? Math.round(seq.getBoundingClientRect().top) : null,
          s1Top: s1 ? Math.round(s1.getBoundingClientRect().top) : null,
          s2Top: s2 ? Math.round(s2.getBoundingClientRect().top) : null,
          wrappers
        };
      })()
    `);
    console.log(`=== ${name} ===`);
    console.log(JSON.stringify(res, null, 2));
  } finally {
    await cdp.close();
  }
}

async function main() {
  await inspect('http://localhost:3000/test-orig/', 'TEST-ORIG AT 6000');
  await inspect('http://localhost:3000/', 'SHREEYOG AT 6000');
}
main();
