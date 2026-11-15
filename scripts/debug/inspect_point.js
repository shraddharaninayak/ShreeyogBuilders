const CDP = require('./cdp_helper.js');

async function test() {
  const cdp = new CDP(9235);
  try {
    await cdp.connect('http://localhost:3000/');
    await new Promise(r => setTimeout(r, 3500));
    await cdp.eval(`(() => {
      window.scrollTo(0, 800);
    })()`);
    await new Promise(r => setTimeout(r, 500));
    const elAtLogo = await cdp.eval(`(() => {
      const el = document.elementFromPoint(100, 30);
      return { tag: el ? el.tagName : null, cls: el ? el.className : null, id: el ? el.id : null };
    })()`);
    const elAtCenter = await cdp.eval(`(() => {
      const el = document.elementFromPoint(700, 30);
      return { tag: el ? el.tagName : null, cls: el ? el.className : null, id: el ? el.id : null };
    })()`);
    console.log('elAtLogo:', elAtLogo);
    console.log('elAtCenter:', elAtCenter);
  } finally {
    await cdp.close();
  }
}
test();
