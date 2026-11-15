const CDP = require('./cdp_helper');

async function main() {
  const cdp = new CDP(9448);
  try {
    await cdp.connect('http://localhost:3000/');
    await new Promise(r => setTimeout(r, 2000));

    const res = await cdp.eval(`
      (() => {
        const w = document.querySelector('.c-objects .-w');
        const cObj = document.querySelector('.c-objects');
        const main = document.querySelector('main');
        const body = document.body;

        const testEl = (parent, name) => {
          const test = document.createElement('div');
          test.style.cssText = 'position: sticky; top: 0; height: 100px;';
          parent.appendChild(test);
          window.scrollTo(0, 6000);
          const r = test.getBoundingClientRect();
          test.remove();
          return { name, top: Math.round(r.top) };
        };

        return {
          inW: testEl(w, 'inW'),
          inCObj: testEl(cObj, 'inCObj'),
          inMain: testEl(main, 'inMain'),
          inBody: testEl(body, 'inBody')
        };
      })()
    `);
    console.log('Sticky locations test:', res);
  } catch (e) {
    console.error(e);
  } finally {
    await cdp.close();
  }
}
main();
