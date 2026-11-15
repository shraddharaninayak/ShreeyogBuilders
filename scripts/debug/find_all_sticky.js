const CDP = require('./cdp_helper');

async function main() {
  const cdp = new CDP(9461);
  try {
    await cdp.connect('http://localhost:3000/');
    await new Promise(r => setTimeout(r, 2000));

    const res = await cdp.eval(`
      (() => {
        const stickyEls = Array.from(document.querySelectorAll('*')).filter(el => {
          return getComputedStyle(el).position === 'sticky';
        }).map(el => {
          const r = el.getBoundingClientRect();
          return {
            tag: el.tagName,
            cls: el.className,
            top: Math.round(r.top),
            height: Math.round(r.height),
            parentCls: el.parentElement?.className
          };
        });
        return { count: stickyEls.length, stickyEls };
      })()
    `);
    console.log('ALL STICKY ELEMENTS ON HOMEPAGE:');
    console.log(JSON.stringify(res, null, 2));
  } catch (e) {
    console.error(e);
  } finally {
    await cdp.close();
  }
}
main();
