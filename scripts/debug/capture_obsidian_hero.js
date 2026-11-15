const CDP = require('./cdp_helper.js');
const fs = require('fs');

const ARTIFACT_DIR = 'C:/Users/supri/.gemini/antigravity/brain/ff998ab5-1a3d-42c3-84d4-6774c67af56b';

async function captureObsidian() {
  const cdp = new CDP(9233);
  try {
    console.log('Connecting to http://localhost:3001/ ...');
    await cdp.connect('http://localhost:3001/');
    await new Promise(r => setTimeout(r, 3500));

    // Capture initial
    await cdp.screenshot(`${ARTIFACT_DIR}/obsidian_pristine_01_initial.png`);
    console.log('Saved obsidian_pristine_01_initial.png');

    // Inspect hero elements in obsidian
    const info0 = await cdp.eval(`(() => {
      const l1 = document.querySelector('.c-welcome .-w span.line-1');
      const l2 = document.querySelector('.c-welcome .-w span.line-2');
      const l3 = document.querySelector('.c-welcome .-w span.line-3');
      const l1m = document.querySelector('.c-welcome .-w .line-1-m');
      const l2m = document.querySelector('.c-welcome .-w .line-2-m');
      const stone = document.querySelector('.c-welcome .-w .stone');
      const places = document.querySelector('.c-welcome .-w .places');
      const items = document.querySelector('.c-welcome .-w .items');

      function m(el) {
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return {
          text: el.innerText.replace(/\\n/g, ' '),
          top: Math.round(r.top),
          left: Math.round(r.left),
          width: Math.round(r.width),
          height: Math.round(r.height),
          transform: window.getComputedStyle(el).transform,
          style: el.getAttribute('style')
        };
      }

      return {
        scrollY: window.scrollY,
        line1: m(l1),
        line2: m(l2),
        line3: m(l3),
        line1m: m(l1m),
        line2m: m(l2m),
        stone: m(stone),
        places: m(places),
        items: m(items)
      };
    })()`);
    console.log('Obsidian Initial Metrics:', JSON.stringify(info0, null, 2));

    // Scroll down 2500 and back to 0
    await cdp.eval(`window.scrollTo(0, 2500)`);
    await new Promise(r => setTimeout(r, 1000));
    await cdp.eval(`window.scrollTo(0, 0)`);
    await new Promise(r => setTimeout(r, 1500));

    await cdp.screenshot(`${ARTIFACT_DIR}/obsidian_pristine_02_back_at_top.png`);
    console.log('Saved obsidian_pristine_02_back_at_top.png');

    const infoBack = await cdp.eval(`(() => {
      const l1 = document.querySelector('.c-welcome .-w span.line-1');
      const l2 = document.querySelector('.c-welcome .-w span.line-2');
      const l3 = document.querySelector('.c-welcome .-w span.line-3');
      const l1m = document.querySelector('.c-welcome .-w .line-1-m');
      const l2m = document.querySelector('.c-welcome .-w .line-2-m');
      const stone = document.querySelector('.c-welcome .-w .stone');
      const places = document.querySelector('.c-welcome .-w .places');
      const items = document.querySelector('.c-welcome .-w .items');

      function m(el) {
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return {
          top: Math.round(r.top),
          left: Math.round(r.left),
          width: Math.round(r.width),
          height: Math.round(r.height),
          transform: window.getComputedStyle(el).transform,
          style: el.getAttribute('style')
        };
      }

      return {
        scrollY: window.scrollY,
        line1: m(l1),
        line2: m(l2),
        line3: m(l3),
        line1m: m(l1m),
        line2m: m(l2m),
        stone: m(stone),
        places: m(places),
        items: m(items)
      };
    })()`);
    console.log('Obsidian Back at Top Metrics:', JSON.stringify(infoBack, null, 2));

  } finally {
    await cdp.close();
  }
}

captureObsidian().catch(console.error);
