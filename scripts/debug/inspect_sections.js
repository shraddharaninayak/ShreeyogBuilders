const CDP = require('./cdp_helper.js');

async function testSections() {
  const cdp = new CDP(9233);
  try {
    await cdp.connect('http://localhost:3000/');
    await new Promise(r => setTimeout(r, 2000));
    const html = await cdp.eval(`document.body.innerHTML`);
    console.log('Body HTML length:', html.length);
    console.log('Body HTML preview:', html.slice(0, 1000));
  } finally {
    await cdp.close();
  }
}

testSections().catch(console.error);
