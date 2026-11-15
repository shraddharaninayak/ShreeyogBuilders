const CDP = require('./cdp_helper');

async function main() {
  const cdp = new CDP(9485);
  try {
    await cdp.connect('http://localhost:3000/');
    await new Promise(r => setTimeout(r, 2000));

    const res = await cdp.eval(`
      (() => {
        // Let's create a test sticky element inside each ancestor
        // and see which one sticks!
        const html = document.documentElement;
        const body = document.body;
        const ip = document.getElementById('ImaginePossible');
        const main = document.querySelector('main');
        const cObj = document.querySelector('.c-objects');
        const w = document.querySelector('.c-objects .-w');
        const seq = document.querySelector('.c-objects .sequence');

        function testSticky(parent, name) {
          const testDiv = document.createElement('div');
          testDiv.style.cssText = 'position: sticky; top: 0px; height: 50px; background: red; z-index: 99999;';
          testDiv.textContent = name;
          parent.insertBefore(testDiv, parent.firstChild);

          window.scrollTo(0, 0);
          const top0 = testDiv.getBoundingClientRect().top;

          window.scrollTo(0, 3000);
          const top3000 = testDiv.getBoundingClientRect().top;

          testDiv.remove();
          return { name, top0: Math.round(top0), top3000: Math.round(top3000), stuck: top3000 === 0 };
        }

        const res1 = [
          testSticky(body, 'inside body'),
          testSticky(ip, 'inside #ImaginePossible'),
          testSticky(main, 'inside main'),
          testSticky(cObj, 'inside c-objects'),
          testSticky(w, 'inside .-w')
        ];

        return res1;
      })()
    `);
    console.log('STICKY BY ANCESTOR LEVEL:');
    console.log(JSON.stringify(res, null, 2));
  } catch (e) {
    console.error(e);
  } finally {
    await cdp.close();
  }
}
main();
