const CDP = require('./cdp_helper');

async function main() {
  const cdp = new CDP(9458);
  try {
    await cdp.connect('http://localhost:3000/');
    await new Promise(r => setTimeout(r, 2000));

    const res = await cdp.eval(`
      (() => {
        window.scrollTo(0, 2000);
        const placesGc = document.querySelector('.c-places .-gc');
        const placesSticky = document.querySelector('.c-places .sticky-container');
        return {
          scrollY: window.scrollY,
          placesGcTop: placesGc ? Math.round(placesGc.getBoundingClientRect().top) : null,
          placesStickyTop: placesSticky ? Math.round(placesSticky.getBoundingClientRect().top) : null
        };
      })()
    `);
    console.log('Places sticky check at 2000:', res);
  } catch (e) {
    console.error(e);
  } finally {
    await cdp.close();
  }
}
main();
