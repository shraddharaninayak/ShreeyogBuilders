const CDP = require('./cdp_helper');
const fs = require('fs');
const path = require('path');

const artifactsDir = 'C:\\Users\\supri\\.gemini\\antigravity\\brain\\ff998ab5-1a3d-42c3-84d4-6774c67af56b';

async function main() {
  const cdp = new CDP(9444);
  try {
    console.log('Connecting to Chrome via CDP...');
    await cdp.connect('http://localhost:3000/');
    console.log('Connected!');

    await new Promise(r => setTimeout(r, 2500));

    // Inspect why sequence behaves the way it does
    const info = await cdp.eval(`
      (() => {
        const seq = document.querySelector('.c-objects .sequence');
        const w = document.querySelector('.c-objects .-w');
        const cObj = document.querySelector('.c-objects');
        const s1 = document.querySelector('.c-objects .sticky-container-1');
        const s2 = document.querySelector('.c-objects .sticky-container-2');
        const sticky = document.querySelector('.c-objects .sticky');
        
        return {
          windowH: window.innerHeight,
          windowW: window.innerWidth,
          seqTag: seq ? seq.tagName : null,
          seqClasses: seq ? seq.className : null,
          seqComputed: seq ? {
            position: getComputedStyle(seq).position,
            top: getComputedStyle(seq).top,
            height: getComputedStyle(seq).height,
            display: getComputedStyle(seq).display,
            gridRow: getComputedStyle(seq).gridRow,
            alignSelf: getComputedStyle(seq).alignSelf
          } : null,
          cObjRect: cObj ? cObj.getBoundingClientRect() : null,
          wRect: w ? w.getBoundingClientRect() : null,
          seqRect: seq ? seq.getBoundingClientRect() : null,
          stickyRect: sticky ? sticky.getBoundingClientRect() : null
        };
      })()
    `);
    console.log('Initial page info:', JSON.stringify(info, null, 2));

    // Capture hero
    await cdp.screenshot(path.join(artifactsDir, 'live_01_hero.png'));
    console.log('Captured live_01_hero.png');

    // Test scroll to 6500 (container 1)
    await cdp.eval('window.scrollTo(0, 6500)');
    await new Promise(r => setTimeout(r, 600));
    await cdp.screenshot(path.join(artifactsDir, 'live_02_container1.png'));
    console.log('Captured live_02_container1.png');

    // Test scroll to 9200 (container 2 card 1)
    await cdp.eval('window.scrollTo(0, 9200)');
    await new Promise(r => setTimeout(r, 600));
    const cardInfo = await cdp.eval(`
      (() => {
        const seq = document.querySelector('.c-objects .sequence');
        const cards = Array.from(document.querySelectorAll('.c-objects .object-wrapper')).map(w => ({
          cls: w.className,
          rect: w.getBoundingClientRect(),
          imgSrc: w.querySelector('img')?.src,
          imgRect: w.querySelector('img')?.getBoundingClientRect()
        }));
        return {
          scrollY: window.scrollY,
          seqRect: seq.getBoundingClientRect(),
          cards
        };
      })()
    `);
    console.log('At y=9200:', JSON.stringify(cardInfo, null, 2));
    await cdp.screenshot(path.join(artifactsDir, 'live_03_cards.png'));
    console.log('Captured live_03_cards.png');

  } catch (e) {
    console.error('Error:', e);
  } finally {
    await cdp.close();
  }
}

main();
