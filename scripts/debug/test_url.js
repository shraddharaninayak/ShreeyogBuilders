const CDP = require('./cdp_helper.js');

async function testUrl() {
  const cdp = new CDP(9233);
  try {
    await cdp.connect('http://localhost:3000/');
    await new Promise(r => setTimeout(r, 2000));
    const r = await cdp.eval(`({
      url: window.location.href,
      title: document.title,
      htmlLen: document.documentElement.innerHTML.length,
      l1: !!document.querySelector('.c-welcome .-w span.line-1')
    })`);
    console.log('Page State:', r);
  } finally {
    await cdp.close();
  }
}

testUrl().catch(console.error);
