const CDP = require('./cdp_helper.js');

(async () => {
  const cdp = new CDP(9239);
  try {
    await cdp.connect('http://localhost:3000/');
    await new Promise(r => setTimeout(r, 4000));

    console.log('--- Initial State ---');
    const initial = await cdp.eval(`(() => {
      const w = document.querySelector('.c-welcome .-w');
      return {
        display: window.getComputedStyle(w).display,
        sheetCount: document.styleSheets.length,
        sheets: Array.from(document.styleSheets).map(s => s.href).filter(Boolean)
      };
    })()`);
    console.log('Initial sheets:', initial);

    // Scroll down gradually or to 2500, 5000, etc.
    console.log('Scrolling down to 2000...');
    await cdp.eval('window.scrollTo(0, 2000)');
    await new Promise(r => setTimeout(r, 1000));

    console.log('Scrolling down to 5000...');
    await cdp.eval('window.scrollTo(0, 5000)');
    await new Promise(r => setTimeout(r, 1000));

    console.log('Scrolling down to bottom...');
    await cdp.eval('window.scrollTo(0, document.body.scrollHeight)');
    await new Promise(r => setTimeout(r, 1500));

    const atBottom = await cdp.eval(`(() => {
      const w = document.querySelector('.c-welcome .-w');
      return {
        display: window.getComputedStyle(w).display,
        sheetCount: document.styleSheets.length,
        sheets: Array.from(document.styleSheets).map(s => s.href).filter(Boolean)
      };
    })()`);
    console.log('At bottom sheets:', atBottom);

    console.log('Scrolling back to top 0...');
    await cdp.eval('window.scrollTo(0, 0)');
    await new Promise(r => setTimeout(r, 1000));

    const backAtTop = await cdp.eval(`(() => {
      const w = document.querySelector('.c-welcome .-w');
      const l1 = document.querySelector('.c-welcome .-w span.line-1');
      const l2 = document.querySelector('.c-welcome .-w span.line-2');
      const l3 = document.querySelector('.c-welcome .-w span.line-3');
      const l1m = document.querySelector('.c-welcome .-w .line-1-m');
      const l2m = document.querySelector('.c-welcome .-w .line-2-m');

      return {
        display: window.getComputedStyle(w).display,
        l1: { top: l1?.getBoundingClientRect().top, left: l1?.getBoundingClientRect().left },
        l3: { top: l3?.getBoundingClientRect().top, left: l3?.getBoundingClientRect().left },
        l1m: { top: l1m?.getBoundingClientRect().top, left: l1m?.getBoundingClientRect().left },
        l2m: { top: l2m?.getBoundingClientRect().top, left: l2m?.getBoundingClientRect().left }
      };
    })()`);
    console.log('Back at top:', backAtTop);

    await cdp.screenshot('C:/Users/supri/.gemini/antigravity/brain/052d3503-3ffa-4c2b-b51f-0571d6a9d35d/scroll_test_return.png');

  } catch (err) {
    console.error('Error:', err);
  } finally {
    await cdp.close();
  }
})();
