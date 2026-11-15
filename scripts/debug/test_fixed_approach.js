const CDP = require('./cdp_helper');
const fs = require('fs');
const path = require('path');

const artifactsDir = 'C:\\Users\\supri\\.gemini\\antigravity\\brain\\ff998ab5-1a3d-42c3-84d4-6774c67af56b';

async function main() {
  const cdp = new CDP(9451);
  try {
    await cdp.connect('http://localhost:3000/');
    await new Promise(r => setTimeout(r, 2500));

    // Apply the position: fixed when .c-objects.-inview (or when c-objects is active)
    await cdp.eval(`
      (() => {
        const style = document.createElement('style');
        style.id = 'sticky-fixed-mode';
        style.textContent = \`
          .c-objects .sequence {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            z-index: 10 !important;
            pointer-events: none !important;
          }
          .c-objects .sequence * {
            pointer-events: auto !important;
          }
          .c-objects .sequence .object-wrapper figure {
            opacity: 1 !important;
            visibility: visible !important;
            display: block !important;
            width: 100% !important;
            height: 100% !important;
            aspect-ratio: 1200 / 1600 !important;
            border-radius: 0.4rem !important;
            overflow: hidden !important;
          }
          .c-objects .sequence .object-wrapper figure img {
            width: 100% !important;
            height: 100% !important;
            object-fit: cover !important;
            display: block !important;
            opacity: 1 !important;
            visibility: visible !important;
          }
        \`;
        document.head.appendChild(style);
      })()
    `);

    // Test at y = 9200 (card 1/4)
    await cdp.eval('window.scrollTo(0, 9200)');
    await new Promise(r => setTimeout(r, 600));

    const cardState = await cdp.eval(`
      (() => {
        const cards = Array.from(document.querySelectorAll('.c-objects .object-wrapper')).map((w, i) => {
          const r = w.getBoundingClientRect();
          const img = w.querySelector('img');
          const ir = img ? img.getBoundingClientRect() : null;
          return {
            i,
            cls: w.className,
            top: Math.round(r.top),
            left: Math.round(r.left),
            w: Math.round(r.width),
            h: Math.round(r.height),
            imgSrc: img ? img.src?.slice(0, 30) : null,
            imgW: ir ? Math.round(ir.width) : 0,
            imgH: ir ? Math.round(ir.height) : 0
          };
        });
        const title = document.querySelector('.c-objects .place-name')?.textContent || '';
        const order = document.querySelector('.c-objects .order')?.textContent?.replace(/\\s+/g, ' ').trim() || '';
        return { title, order, cards };
      })()
    `);
    console.log('Card state at 9200:', JSON.stringify(cardState, null, 2));

    await cdp.screenshot(path.join(artifactsDir, 'test_fixed_cards_9200.png'));
    console.log('Saved test_fixed_cards_9200.png');

    // Test at y = 10800 (card shuffle 2/4)
    await cdp.eval('window.scrollTo(0, 10800)');
    await new Promise(r => setTimeout(r, 600));
    await cdp.screenshot(path.join(artifactsDir, 'test_fixed_cards_10800.png'));
    console.log('Saved test_fixed_cards_10800.png');

  } catch (e) {
    console.error(e);
  } finally {
    await cdp.close();
  }
}
main();
