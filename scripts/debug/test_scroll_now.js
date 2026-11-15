const CDP = require('./cdp_helper');

async function main() {
  const cdp = new CDP(9456);
  try {
    await cdp.connect('http://localhost:3000/');
    await new Promise(r => setTimeout(r, 2000));

    const res = await cdp.eval(`
      (() => {
        const before = window.scrollY;
        window.scrollTo(0, 6500);
        const afterWin = window.scrollY;
        
        document.documentElement.scrollTop = 6500;
        const afterDoc = document.documentElement.scrollTop;

        document.body.scrollTop = 6500;
        const afterBody = document.body.scrollTop;

        return { before, afterWin, afterDoc, afterBody };
      })()
    `);
    console.log('Scroll test:', res);
  } catch (e) {
    console.error(e);
  } finally {
    await cdp.close();
  }
}
main();
