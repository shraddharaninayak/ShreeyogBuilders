const CDP = require('./cdp_helper');
const fs = require('fs');
const path = require('path');

const ARTIFACT_DIR = 'C:\\Users\\supri\\.gemini\\antigravity\\brain\\ff998ab5-1a3d-42c3-84d4-6774c67af56b';

async function main() {
  const cdp = new CDP(9501);
  try {
    await cdp.connect('http://localhost:3000/');
    // Wait for initial page transition and load to settle
    await new Promise(r => setTimeout(r, 3000));

    // 1. Check basic page health
    const pageHealth = await cdp.eval(`
      (() => {
        const bodyCs = getComputedStyle(document.body);
        const htmlCs = getComputedStyle(document.documentElement);
        const projCss = Array.from(document.querySelectorAll('link')).some(l => l.href.includes('shreeyog-projects.css'));
        return {
          title: document.title,
          htmlClass: document.documentElement.className,
          bodyClass: document.body.className,
          bodyOverflow: bodyCs.overflow,
          bodyOverflowX: bodyCs.overflowX,
          bodyOverflowY: bodyCs.overflowY,
          htmlOverflow: htmlCs.overflow,
          htmlOverflowX: htmlCs.overflowX,
          htmlOverflowY: htmlCs.overflowY,
          hasProjCss: projCss,
          totalHeight: document.documentElement.scrollHeight
        };
      })()
    `);
    console.log('PAGE HEALTH:', JSON.stringify(pageHealth, null, 2));

    // Define journey test steps
    const testSteps = [
      { name: '01_hero', y: 0, delay: 500 },
      { name: '02_places_carousel_2500', y: 2500, delay: 600 },
      { name: '03_places_carousel_3500', y: 3500, delay: 600 },
      { name: '04_interactive_map_5000', y: 5000, delay: 600 },
      { name: '05_objects_the_art_of_living_6500', y: 6500, delay: 600 },
      { name: '06_objects_card_1_arch_character_9200', y: 9200, delay: 600 },
      { name: '07_objects_card_2_thoughtful_spaces_10500', y: 10500, delay: 600 },
      { name: '08_objects_card_3_everyday_comfort_11500', y: 11500, delay: 600 },
      { name: '09_objects_card_4_spaces_to_connect_12500', y: 12500, delay: 600 },
      { name: '10_connection_philosophy_13500', y: 13500, delay: 600 },
      { name: '11_marble_footer_14800', y: 14800, delay: 600 }
    ];

    const results = [];
    for (const step of testSteps) {
      await cdp.eval(`window.scrollTo(0, ${step.y})`);
      await new Promise(r => setTimeout(r, step.delay));

      const state = await cdp.eval(`
        (() => {
          const scrollY = window.scrollY;
          // places
          const placesGc = document.querySelector('.c-places .sticky-container .-gc');
          const placesIdx = document.querySelector('.c-places .places-order-index') || document.querySelector('.c-places .order');
          const placesName = document.querySelector('.c-places .places-name-val') || document.querySelector('.c-places .place-name');
          
          // objects
          const seq = document.querySelector('.c-objects .sequence');
          const objTitle = document.querySelector('.c-objects .sticky-container-1 .title');
          const objNav = document.querySelector('.c-objects .sticky-container-2 .sticky');
          const objCounter = document.querySelector('.c-objects .sticky-container-2 .order');
          const objName = document.querySelector('.c-objects .sticky-container-2 .place-name');
          const cards = Array.from(document.querySelectorAll('.c-objects .object-wrapper')).map(w => {
            const r = w.getBoundingClientRect();
            const img = w.querySelector('img');
            return {
              cls: w.className,
              top: Math.round(r.top),
              height: Math.round(r.height),
              visible: r.top < window.innerHeight && r.bottom > 0,
              imgSrc: img ? img.currentSrc.slice(-35) : null,
              imgNaturalW: img ? img.naturalWidth : 0
            };
          });

          return {
            scrollY,
            placesStickyTop: placesGc ? Math.round(placesGc.getBoundingClientRect().top) : null,
            placesIndexText: placesIdx ? placesIdx.textContent.trim() : null,
            placesNameText: placesName ? placesName.textContent.trim() : null,
            seqTop: seq ? Math.round(seq.getBoundingClientRect().top) : null,
            objTitleTop: objTitle ? Math.round(objTitle.getBoundingClientRect().top) : null,
            objNavTop: objNav ? Math.round(objNav.getBoundingClientRect().top) : null,
            objCounterText: objCounter ? objCounter.textContent.trim() : null,
            objNameText: objName ? objName.textContent.trim() : null,
            cards
          };
        })()
      `);

      const outPath = path.join(ARTIFACT_DIR, `verified_${step.name}.png`);
      await cdp.screenshot(outPath);

      console.log(`Step ${step.name} at y=${step.y}:`);
      console.log('  State:', JSON.stringify(state));
      console.log(`  Saved: verified_${step.name}.png`);
      results.push({ step: step.name, state });
    }

    // Bidirectional scroll test: scroll back up to 0 in 3 increments
    console.log('--- REVERSE BIDIRECTIONAL SCROLL TEST ---');
    for (const y of [10000, 5000, 0]) {
      await cdp.eval(`window.scrollTo(0, ${y})`);
      await new Promise(r => setTimeout(r, 400));
      const upState = await cdp.eval(`
        (() => ({
          scrollY: window.scrollY,
          placesStickyTop: (() => { const el = document.querySelector('.c-places .sticky-container .-gc'); return el ? Math.round(el.getBoundingClientRect().top) : null; })(),
          seqTop: (() => { const el = document.querySelector('.c-objects .sequence'); return el ? Math.round(el.getBoundingClientRect().top) : null; })()
        }))()
      `);
      console.log(`Reverse at y=${y}:`, JSON.stringify(upState));
    }

    const finalScreenshotPath = path.join(ARTIFACT_DIR, 'verified_reverse_back_at_top.png');
    await cdp.screenshot(finalScreenshotPath);
    console.log('Reverse complete and verified!');

  } catch (e) {
    console.error('Error during verification:', e);
  } finally {
    await cdp.close();
  }
}
main();
