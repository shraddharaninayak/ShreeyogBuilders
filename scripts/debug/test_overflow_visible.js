const CDP = require('./cdp_helper');

async function main() {
  const cdp = new CDP(9494);
  try {
    await cdp.connect('http://localhost:3000/');
    await new Promise(r => setTimeout(r, 2000));

    const res = await cdp.eval(`
      (() => {
        // Set overflow: visible on html and body
        document.documentElement.style.setProperty('overflow', 'visible', 'important');
        document.body.style.setProperty('overflow', 'visible', 'important');

        const testDiv = document.createElement('div');
        testDiv.style.cssText = 'position: sticky; top: 0px; height: 50px; background: red; z-index: 99999;';
        document.body.insertBefore(testDiv, document.body.firstChild);

        window.scrollTo(0, 0);
        const top0 = testDiv.getBoundingClientRect().top;

        window.scrollTo(0, 3000);
        const top3000 = testDiv.getBoundingClientRect().top;

        testDiv.remove();

        return {
          top0: Math.round(top0),
          top3000: Math.round(top3000),
          scrollY: window.scrollY,
          htmlOverflow: getComputedStyle(document.documentElement).overflow,
          bodyOverflow: getComputedStyle(document.body).overflow,
          scrollingElement: document.scrollingElement ? document.scrollingElement.tagName : null
        };
      })()
    `);
    console.log('OVERFLOW VISIBLE TEST:', res);
  } catch (e) {
    console.error(e);
  } finally {
    await cdp.close();
  }
}
main();
