const CDP = require('./cdp_helper.js');
const fs = require('fs');

(async () => {
  const cdp = new CDP(9235);
  try {
    await cdp.connect('http://localhost:3000/');
    await new Promise(r => setTimeout(r, 4000));
    const artifactPath = 'C:/Users/supri/.gemini/antigravity/brain/052d3503-3ffa-4c2b-b51f-0571d6a9d35d/initial_test.png';
    await cdp.screenshot(artifactPath);
    console.log('Saved screenshot to:', artifactPath);

    const info = await cdp.eval(`(() => {
      const l1 = document.querySelector('.c-welcome .-w span.line-1');
      const l2 = document.querySelector('.c-welcome .-w span.line-2');
      const l3 = document.querySelector('.c-welcome .-w span.line-3');
      const l1m = document.querySelector('.c-welcome .-w .line-1-m');
      const l2m = document.querySelector('.c-welcome .-w .line-2-m');
      const cta = document.querySelector('.c-welcome .-w .cta');
      const stone = document.querySelector('.c-welcome .-w .stone');
      const places = document.querySelector('.c-welcome .-w .places');
      const items = document.querySelector('.c-welcome .-w .items');

      function getProps(el) {
        if (!el) return null;
        const r = el.getBoundingClientRect();
        const cs = window.getComputedStyle(el);
        return {
          text: el.innerText.trim(),
          top: Math.round(r.top),
          bottom: Math.round(r.bottom),
          left: Math.round(r.left),
          right: Math.round(r.right),
          width: Math.round(r.width),
          height: Math.round(r.height),
          transform: cs.transform,
          opacity: cs.opacity,
          display: cs.display,
          gridArea: cs.gridArea,
          gridColumn: cs.gridColumn,
          gridRow: cs.gridRow,
          progress: cs.getPropertyValue('--progress')
        };
      }

      return {
        scrollY: window.scrollY,
        l1: getProps(l1),
        l2: getProps(l2),
        l3: getProps(l3),
        l1m: getProps(l1m),
        l2m: getProps(l2m),
        cta: getProps(cta),
        stone: getProps(stone),
        places: getProps(places),
        items: getProps(items)
      };
    })()`);

    console.log('Initial hero info:');
    console.log(JSON.stringify(info, null, 2));
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await cdp.close();
  }
})();
