const CDP = require('./cdp_helper.js');

async function testSelector() {
  const cdp = new CDP(9233);
  try {
    await cdp.connect('http://localhost:3000/');
    await new Promise(r => setTimeout(r, 2000));
    const r = await cdp.eval(`(() => {
      const welcome = document.querySelector('.c-welcome');
      const w = document.querySelector('.c-welcome .-w');
      const spans = w ? Array.from(w.querySelectorAll('span')).map(s => ({ cls: s.className, txt: s.innerText.slice(0, 30) })) : [];
      return {
        hasWelcome: !!welcome,
        hasW: !!w,
        spans: spans.slice(0, 10)
      };
    })()`);
    console.log('Selectors in Welcome:', r);
  } finally {
    await cdp.close();
  }
}

testSelector().catch(console.error);
