const CDP = require('./cdp_helper');

async function main() {
  const cdp = new CDP(9460);
  try {
    await cdp.connect('http://localhost:3000/');
    await new Promise(r => setTimeout(r, 2000));

    const res = await cdp.eval(`
      (() => {
        // Test BEFORE
        const placesGc = document.querySelector('.c-places .sticky-container') || document.querySelector('.c-places');
        const beforeTop0 = placesGc ? placesGc.getBoundingClientRect().top : 0;
        window.scrollTo(0, 2000);
        const beforeTop2000 = placesGc ? placesGc.getBoundingClientRect().top : 0;

        // Apply fix
        const main = document.querySelector('main');
        if (main) main.style.contain = 'none';
        document.body.style.overflow = 'visible';
        document.documentElement.style.overflow = 'visible';

        // Test AFTER fix
        window.scrollTo(0, 0);
        const afterTop0 = placesGc ? placesGc.getBoundingClientRect().top : 0;
        window.scrollTo(0, 2000);
        const afterTop2000 = placesGc ? placesGc.getBoundingClientRect().top : 0;

        return {
          before: { top0: Math.round(beforeTop0), top2000: Math.round(beforeTop2000) },
          after: { top0: Math.round(afterTop0), top2000: Math.round(afterTop2000) }
        };
      })()
    `);
    console.log('STICKY BEFORE vs AFTER REMOVING OVERFLOW/CONTAIN:', res);
  } catch (e) {
    console.error(e);
  } finally {
    await cdp.close();
  }
}
main();
