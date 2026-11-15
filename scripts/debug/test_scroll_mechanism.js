const CDP = require('./cdp_helper');

async function main() {
  const cdp = new CDP(9452);
  try {
    await cdp.connect('http://localhost:3000/');
    await new Promise(r => setTimeout(r, 2000));

    const res = await cdp.eval(`
      (() => {
        const html = document.documentElement;
        const body = document.body;
        const se = document.scrollingElement;

        // Try scrolling via different methods
        window.scrollTo(0, 1000);
        const yWin = window.scrollY;
        
        html.scrollTop = 1000;
        const yHtml = html.scrollTop;

        body.scrollTop = 1000;
        const yBody = body.scrollTop;

        if (se) {
          se.scrollTop = 1000;
        }
        const ySe = se ? se.scrollTop : -1;

        return {
          windowScrollY: yWin,
          htmlScrollTop: yHtml,
          bodyScrollTop: yBody,
          seTagName: se ? se.tagName : null,
          seScrollTop: ySe,
          htmlOverflow: getComputedStyle(html).overflow,
          bodyOverflow: getComputedStyle(body).overflow
        };
      })()
    `);
    console.log('Scroll investigation:', res);
  } catch (e) {
    console.error(e);
  } finally {
    await cdp.close();
  }
}
main();
