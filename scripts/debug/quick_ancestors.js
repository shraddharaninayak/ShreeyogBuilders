const CDP = require('./cdp_helper');

async function main() {
  const cdp = new CDP(9468);
  try {
    await cdp.connect('http://localhost:3000/');
    await new Promise(r => setTimeout(r, 2000));

    const chain = await cdp.eval(`
      (() => {
        const seq = document.querySelector('.c-objects .sequence');
        let curr = seq;
        const res = [];
        while (curr) {
          const cs = getComputedStyle(curr);
          res.push({
            tag: curr.tagName,
            cls: curr.className.toString(),
            id: curr.id,
            overflow: cs.overflow,
            overflowX: cs.overflowX,
            overflowY: cs.overflowY,
            contain: cs.contain,
            transform: cs.transform,
            position: cs.position
          });
          curr = curr.parentElement;
        }
        return res;
      })()
    `);
    console.log('ANCESTOR CHAIN:');
    console.log(JSON.stringify(chain, null, 2));
  } catch (e) {
    console.error(e);
  } finally {
    await cdp.close();
  }
}
main();
