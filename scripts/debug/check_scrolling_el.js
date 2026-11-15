const CDP = require('./cdp_helper');

async function main() {
  const cdp = new CDP(9530);
  try {
    await cdp.connect('http://localhost:3000/');
    await new Promise(r => setTimeout(r, 2000));

    const res = await cdp.eval(`
      (() => {
        const se = document.scrollingElement;
        const html = document.documentElement;
        const body = document.body;

        return {
          seTagName: se ? se.tagName : null,
          htmlClass: html.className,
          bodyClass: body.className,
          htmlOverflow: getComputedStyle(html).overflow,
          bodyOverflow: getComputedStyle(body).overflow,
          bodyScrollHeight: body.scrollHeight,
          htmlScrollHeight: html.scrollHeight,
          windowHeight: window.innerHeight
        };
      })()
    `);
    console.log('SCROLLING ELEMENT CHECK:', res);
  } finally {
    await cdp.close();
  }
}
main();
