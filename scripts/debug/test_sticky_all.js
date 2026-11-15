const CDP = require('./cdp_helper');

async function main() {
  const cdp = new CDP(9462);
  try {
    await cdp.connect('http://localhost:3000/');
    await new Promise(r => setTimeout(r, 2000));

    // Test 1: Scroll to 2500 (inside Places Carousel)
    await cdp.eval('window.scrollTo(0, 2500)');
    await new Promise(r => setTimeout(r, 400));
    const placesSticky = await cdp.eval(`
      (() => {
        const el = document.querySelector('.c-places .sticky-container .-gc');
        const r = el.getBoundingClientRect();
        return { top: Math.round(r.top), height: Math.round(r.height) };
      })()
    `);
    console.log('Places sticky at 2500:', placesSticky);

    // Test 2: Scroll to 6500 (inside Objects Container 1)
    await cdp.eval('window.scrollTo(0, 6500)');
    await new Promise(r => setTimeout(r, 400));
    const objTitleSticky = await cdp.eval(`
      (() => {
        const el = document.querySelector('.c-objects .sticky-container-1 .title');
        const r = el.getBoundingClientRect();
        return { top: Math.round(r.top), height: Math.round(r.height) };
      })()
    `);
    console.log('Objects split title sticky at 6500:', objTitleSticky);

    // Test 3: Scroll to 10000 (inside Objects Container 2)
    await cdp.eval('window.scrollTo(0, 10000)');
    await new Promise(r => setTimeout(r, 400));
    const objNavSticky = await cdp.eval(`
      (() => {
        const el = document.querySelector('.c-objects .sticky-container-2 .sticky');
        const r = el.getBoundingClientRect();
        return { top: Math.round(r.top), height: Math.round(r.height) };
      })()
    `);
    console.log('Objects nav sticky at 10000:', objNavSticky);

  } catch (e) {
    console.error(e);
  } finally {
    await cdp.close();
  }
}
main();
