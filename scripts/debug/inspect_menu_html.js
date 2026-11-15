const CDP = require('./cdp_helper.js');

async function test() {
  const cdp = new CDP(9253);
  try {
    await cdp.connect('http://localhost:3000/');
    await new Promise(r => setTimeout(r, 3500));
    const html = await cdp.eval(`document.querySelector('header .menu.button').outerHTML`);
    console.log(html);
  } finally {
    await cdp.close();
  }
}
test();
