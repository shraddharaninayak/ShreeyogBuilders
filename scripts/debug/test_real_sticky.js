const CDP = require('./cdp_helper');

async function main() {
  const cdp = new CDP(9496);
  try {
    await cdp.connect('http://localhost:3000/');
    await new Promise(r => setTimeout(r, 2000));

    const res = await cdp.eval(`
      (() => {
        // Fix overflow on html and body
        document.documentElement.style.setProperty('overflow', 'visible', 'important');
        document.body.style.setProperty('overflow', 'visible', 'important');

        // Test 1: Places at 2500
        window.scrollTo(0, 2500);
        const placesSticky = document.querySelector('.c-places .sticky-container .-gc');
        const rPlaces = placesSticky ? placesSticky.getBoundingClientRect() : null;

        // Test 2: Objects split title at 6500
        window.scrollTo(0, 6500);
        const objTitle = document.querySelector('.c-objects .sticky-container-1 .title');
        const rObjTitle = objTitle ? objTitle.getBoundingClientRect() : null;

        // Test 3: Objects sequence at 6500
        const seq = document.querySelector('.c-objects .sequence');
        const rSeq = seq ? seq.getBoundingClientRect() : null;

        // Test 4: Objects container 2 nav at 10000
        window.scrollTo(0, 10000);
        const objNav = document.querySelector('.c-objects .sticky-container-2 .sticky');
        const rObjNav = objNav ? objNav.getBoundingClientRect() : null;
        const rSeq10000 = seq ? seq.getBoundingClientRect() : null;

        return {
          placesAt2500: rPlaces ? { top: Math.round(rPlaces.top), height: Math.round(rPlaces.height) } : null,
          objTitleAt6500: rObjTitle ? { top: Math.round(rObjTitle.top), height: Math.round(rObjTitle.height) } : null,
          seqAt6500: rSeq ? { top: Math.round(rSeq.top), height: Math.round(rSeq.height) } : null,
          objNavAt10000: rObjNav ? { top: Math.round(rObjNav.top), height: Math.round(rObjNav.height) } : null,
          seqAt10000: rSeq10000 ? { top: Math.round(rSeq10000.top), height: Math.round(rSeq10000.height) } : null
        };
      })()
    `);
    console.log('REAL STICKY BEHAVIOR WITH CLEAN OVERFLOW:');
    console.log(JSON.stringify(res, null, 2));
  } catch (e) {
    console.error(e);
  } finally {
    await cdp.close();
  }
}
main();
