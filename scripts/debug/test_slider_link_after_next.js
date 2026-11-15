const CDP = require('./cdp_helper.js');

async function testSliderLinkAfterNext() {
  const cdp = new CDP(9277);
  try {
    await cdp.connect('http://localhost:3000/projects');
    await new Promise(r => setTimeout(r, 1200));

    // Click Next button 3 times
    for (let i = 0; i < 3; i++) {
      await cdp.eval(`document.getElementById('featNext')?.click()`);
      await new Promise(r => setTimeout(r, 300));
    }

    // Now check featLink href and click it
    const clickCheck = await cdp.eval(`(() => {
      const btn = document.getElementById('featLink');
      btn.click();
      return {
        href: btn.getAttribute('href'),
        dataHref: btn.getAttribute('data-project-href'),
        name: document.getElementById('featName')?.textContent
      };
    })()`);
    console.log('After slider next, featLink:', clickCheck);

    const currentUrl = await cdp.eval('window.location.href');
    console.log('Current URL:', currentUrl);
    if (currentUrl.endsWith('/projects')) {
      console.log('PASS: Still on /projects!');
    } else {
      console.error('FAIL: Navigated to', currentUrl);
    }
  } finally {
    await cdp.close();
  }
}

testSliderLinkAfterNext();
