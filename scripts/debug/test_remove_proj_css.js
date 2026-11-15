const CDP = require('./cdp_helper');

async function main() {
  const cdp = new CDP(9492);
  try {
    await cdp.connect('http://localhost:3000/');
    await new Promise(r => setTimeout(r, 2000));

    const res = await cdp.eval(`
      (() => {
        // Remove shreeyog-projects.css stylesheet
        const links = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
        const projLink = links.find(l => l.href.includes('shreeyog-projects.css'));
        if (projLink) projLink.remove();

        // Also ensure body and html don't have overflow-x: hidden
        document.documentElement.style.overflowX = 'visible';
        document.body.style.overflowX = 'visible';

        // Now test sticky!
        const testDiv = document.createElement('div');
        testDiv.style.cssText = 'position: sticky; top: 0px; height: 50px; background: red; z-index: 99999;';
        document.body.insertBefore(testDiv, document.body.firstChild);

        window.scrollTo(0, 0);
        const top0 = testDiv.getBoundingClientRect().top;

        window.scrollTo(0, 3000);
        const top3000 = testDiv.getBoundingClientRect().top;

        // Also test .c-places sticky!
        const placesSticky = document.querySelector('.c-places .sticky-container .-gc');
        const rPlaces = placesSticky ? placesSticky.getBoundingClientRect().top : null;

        // Test .c-objects split title sticky at 6500
        window.scrollTo(0, 6500);
        const objTitle = document.querySelector('.c-objects .sticky-container-1 .title');
        const rObjTitle = objTitle ? objTitle.getBoundingClientRect().top : null;

        // Test .c-objects sequence at 6500
        const seq = document.querySelector('.c-objects .sequence');
        const rSeq = seq ? seq.getBoundingClientRect().top : null;

        testDiv.remove();

        return {
          removedProjCss: !!projLink,
          bodySticky: { top0: Math.round(top0), top3000: Math.round(top3000) },
          placesAt3000: rPlaces !== null ? Math.round(rPlaces) : null,
          objTitleAt6500: rObjTitle !== null ? Math.round(rObjTitle) : null,
          seqAt6500: rSeq !== null ? Math.round(rSeq) : null
        };
      })()
    `);
    console.log('REMOVING SHREEYOG-PROJECTS.CSS TEST:');
    console.log(JSON.stringify(res, null, 2));
  } catch (e) {
    console.error(e);
  } finally {
    await cdp.close();
  }
}
main();
