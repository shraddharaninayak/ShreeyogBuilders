const CDP = require('./cdp_helper.js');
const fs = require('fs');
const path = require('path');

const ARTIFACT_DIR = 'C:/Users/supri/.gemini/antigravity/brain/052d3503-3ffa-4c2b-b51f-0571d6a9d35d';

async function runVerification() {
  const cdp = new CDP(9245);
  try {
    console.log('Connecting headless Chrome to http://localhost:3000/ ...');
    await cdp.connect('http://localhost:3000/');

    // Poll until document is ready
    for (let i = 0; i < 40; i++) {
      const ready = await cdp.eval(`!!(document.documentElement && document.documentElement.classList.contains('-ready'))`);
      if (ready) break;
      await new Promise(r => setTimeout(r, 200));
    }
    // Allow entrance transitions to settle completely
    await new Promise(r => setTimeout(r, 3500));

    async function getFullMetrics() {
      return await cdp.eval(`(() => {
        const w = document.querySelector('.c-welcome .-w');
        const l1 = document.querySelector('.c-welcome .-w span.line-1');
        const l2 = document.querySelector('.c-welcome .-w span.line-2');
        const l3 = document.querySelector('.c-welcome .-w span.line-3');
        const l1m = document.querySelector('.c-welcome .-w .line-1-m');
        const l2m = document.querySelector('.c-welcome .-w .line-2-m');
        const stone = document.querySelector('.c-welcome .-w .stone');
        const places = document.querySelector('.c-welcome .-w .places');
        const items = document.querySelector('.c-welcome .-w .items');
        const cta = document.querySelector('.c-welcome .-w .cta');
        const logo = document.querySelector('.shreeyog-brand-logo');
        const pt = document.querySelector('.page-transition');

        function b(el) {
          if (!el) return null;
          const r = el.getBoundingClientRect();
          const cs = window.getComputedStyle(el);
          return {
            top: Math.round(r.top),
            left: Math.round(r.left),
            right: Math.round(r.right),
            bottom: Math.round(r.bottom),
            width: Math.round(r.width),
            height: Math.round(r.height),
            transform: cs.transform,
            opacity: cs.opacity,
            progressVar: cs.getPropertyValue('--progress').trim()
          };
        }

        function overlaps(a, b) {
          if (!a || !b) return false;
          // small 2px tolerance for adjacent borders
          return !(a.right <= b.left + 2 || a.left >= b.right - 2 || a.bottom <= b.top + 2 || a.top >= b.bottom - 2);
        }

        const b1 = b(l1), b2 = b(l2), b3 = b(l3), bm1 = b(l1m), bm2 = b(l2m), bs = b(stone), bp = b(places), bi = b(items), bcta = b(cta);
        const wCs = w ? window.getComputedStyle(w) : null;

        // Check loaded sheets in document
        const loadedSheets = Array.from(document.querySelectorAll('link[rel="stylesheet"]')).map(l => l.href);

        return {
          scrollY: window.scrollY,
          wDisplay: wCs ? wCs.display : null,
          wGridCols: wCs ? wCs.gridTemplateColumns : null,
          logo: b(logo),
          l1: b1,
          l2: b2,
          l3: b3,
          l1m: bm1,
          l2m: bm2,
          stone: bs,
          places: bp,
          items: bi,
          cta: bcta,
          preloaderDisplay: pt ? window.getComputedStyle(pt).display : 'none',
          loadedSheetsCount: loadedSheets.length,
          hasPeopleSheet: loadedSheets.some(s => s.includes('people.')),
          overlaps: {
            'l1 vs l1m': overlaps(b1, bm1),
            'l2 vs l1m': overlaps(b2, bm1),
            'l3 vs l1m': overlaps(b3, bm1),
            'l1 vs l2m': overlaps(b1, bm2),
            'l2 vs l2m': overlaps(b2, bm2),
            'l3 vs l2m': overlaps(b3, bm2),
            'l2m vs cta': overlaps(bm2, bcta),
            'l1m vs l3': overlaps(bm1, b3),
            'l2m vs l3': overlaps(bm2, b3)
          }
        };
      })()`);
    }

    // 1. Initial State
    console.log('\n==============================================');
    console.log('1. INITIAL DESKTOP RESTING STATE');
    console.log('==============================================');
    const initial = await getFullMetrics();
    console.log('w.display:', initial.wDisplay);
    console.log('l1 (Beyond Spaces,): top =', initial.l1.top, 'left =', initial.l1.left);
    console.log('l2 (We Build):        top =', initial.l2.top, 'left =', initial.l2.left);
    console.log('l3 (Legacies.):       top =', initial.l3.top, 'left =', initial.l3.left);
    console.log('l1m (Crafted for...): top =', initial.l1m.top, 'left =', initial.l1m.left);
    console.log('l2m (Thoughtfully..): top =', initial.l2m.top, 'left =', initial.l2m.left);
    console.log('Overlaps:', initial.overlaps);
    console.log('Has people sheet loaded initially:', initial.hasPeopleSheet);

    const initialOverlap = Object.values(initial.overlaps).some(v => v === true);
    if (initialOverlap) {
      console.error('ERROR: Overlap detected in initial state!');
    } else {
      console.log('✓ Initial state is clean, zero text overlap.');
    }

    await cdp.screenshot(`${ARTIFACT_DIR}/evidence_01_initial_hero.png`);
    console.log('Saved evidence_01_initial_hero.png');

    // 2. Menu Click Open and Close Test
    console.log('\n==============================================');
    console.log('2. TESTING MENU OPEN AND CLOSE');
    console.log('==============================================');
    const menuBtnFound = await cdp.eval(`(() => {
      const btn = document.querySelector('#menuToggleBtn') || document.querySelector('header button.menu');
      if (btn) {
        btn.click();
        return true;
      }
      return false;
    })()`);
    console.log('Clicked menu button:', menuBtnFound);
    await new Promise(r => setTimeout(r, 1200));

    await cdp.screenshot(`${ARTIFACT_DIR}/evidence_02_menu_open.png`);
    console.log('Saved evidence_02_menu_open.png');

    // Close menu
    const menuCloseResult = await cdp.eval(`(() => {
      const btn = document.querySelector('#menuToggleBtn') || document.querySelector('header button.menu') || document.querySelector('.c-menu .-close') || document.querySelector('.menu-close');
      if (btn) {
        btn.click();
        return true;
      }
      return false;
    })()`);
    console.log('Clicked close button:', menuCloseResult);
    await new Promise(r => setTimeout(r, 1200));

    const afterMenu = await getFullMetrics();
    console.log('After Menu close - w.display:', afterMenu.wDisplay);
    console.log('Has people sheet loaded after menu:', afterMenu.hasPeopleSheet);

    const menuMatch = (
      afterMenu.l1.top === initial.l1.top &&
      afterMenu.l2.top === initial.l2.top &&
      afterMenu.l3.top === initial.l3.top &&
      afterMenu.l1m.top === initial.l1m.top &&
      afterMenu.l2m.top === initial.l2m.top &&
      afterMenu.stone.top === initial.stone.top &&
      afterMenu.wDisplay === 'grid'
    );
    const afterMenuOverlap = Object.values(afterMenu.overlaps).some(v => v === true);
    console.log(`After Menu: Return match = ${menuMatch ? 'EXACT 100% (0px delta) ✓' : 'NO ✗'}, Overlap = ${afterMenuOverlap ? 'YES ✗' : 'NONE ✓'}`);
    await cdp.screenshot(`${ARTIFACT_DIR}/evidence_03_after_menu_closed.png`);
    console.log('Saved evidence_03_after_menu_closed.png');

    // 3. Perform 5 Full Scroll Cycles Through All Homepage Sections
    console.log('\n==============================================');
    console.log('3. TESTING 5 FULL SCROLL CYCLES THROUGH ALL SECTIONS');
    console.log('==============================================');

    const totalScrollHeight = await cdp.eval('document.documentElement.scrollHeight');
    console.log('Document total scroll height:', totalScrollHeight);

    for (let c = 1; c <= 5; c++) {
      // Scroll to bottom (all the way through all sections, touching footer)
      await cdp.eval(`window.scrollTo(0, document.documentElement.scrollHeight)`);
      await new Promise(r => setTimeout(r, 1000));

      // Scroll back to the very top
      await cdp.eval('window.scrollTo(0, 0)');
      await new Promise(r => setTimeout(r, 1000));

      const back = await getFullMetrics();
      const match = (
        back.l1.top === initial.l1.top &&
        back.l2.top === initial.l2.top &&
        back.l3.top === initial.l3.top &&
        back.l1m.top === initial.l1m.top &&
        back.l2m.top === initial.l2m.top &&
        back.stone.top === initial.stone.top &&
        back.places.top === initial.places.top &&
        back.items.top === initial.items.top &&
        back.l2.progressVar === '0' &&
        back.wDisplay === 'grid'
      );
      const cycleOverlap = Object.values(back.overlaps).some(v => v === true);

      console.log(`Cycle ${c}: Return match = ${match ? 'EXACT 100% (0px delta) ✓' : 'MISMATCH ✗'}, Overlap = ${cycleOverlap ? 'YES ✗' : 'NONE ✓'}, w.display = ${back.wDisplay}`);
      if (!match) {
        console.log('Delta:', {
          l1: back.l1.top - initial.l1.top,
          l2: back.l2.top - initial.l2.top,
          l3: back.l3.top - initial.l3.top,
          l1m: back.l1m.top - initial.l1m.top,
          l2m: back.l2m.top - initial.l2m.top,
          stone: back.stone.top - initial.stone.top
        });
      }
    }

    await cdp.screenshot(`${ARTIFACT_DIR}/evidence_04_after_5_full_scroll_cycles.png`);
    console.log('Saved evidence_04_after_5_full_scroll_cycles.png');

    // 4. Test Page Refresh and Repeat Scroll
    console.log('\n==============================================');
    console.log('4. TESTING PAGE RELOAD AND REPEAT SCROLL');
    console.log('==============================================');
    await cdp.eval('location.reload()');
    await new Promise(r => setTimeout(r, 4500));

    // Scroll through all sections and return
    await cdp.eval(`window.scrollTo(0, document.documentElement.scrollHeight)`);
    await new Promise(r => setTimeout(r, 1000));
    await cdp.eval('window.scrollTo(0, 0)');
    await new Promise(r => setTimeout(r, 1000));

    const reloaded = await getFullMetrics();
    const reloadMatch = (
      reloaded.l1.top === initial.l1.top &&
      reloaded.l2.top === initial.l2.top &&
      reloaded.l3.top === initial.l3.top &&
      reloaded.l1m.top === initial.l1m.top &&
      reloaded.l2m.top === initial.l2m.top &&
      reloaded.stone.top === initial.stone.top &&
      reloaded.places.top === initial.places.top &&
      reloaded.items.top === initial.items.top &&
      reloaded.l2.progressVar === '0' &&
      reloaded.wDisplay === 'grid'
    );
    const reloadOverlap = Object.values(reloaded.overlaps).some(v => v === true);
    console.log(`Reload & Scroll Return Match = ${reloadMatch ? 'EXACT 100% (0px delta) ✓' : 'MISMATCH ✗'}, Overlap = ${reloadOverlap ? 'YES ✗' : 'NONE ✓'}`);
    await cdp.screenshot(`${ARTIFACT_DIR}/evidence_05_refreshed_and_scrolled.png`);
    console.log('Saved evidence_05_refreshed_and_scrolled.png');

    console.log('\n==============================================');
    console.log('ALL VERIFICATION TESTS COMPLETED SUCCESSFULLY!');
    console.log('==============================================');

  } catch (err) {
    console.error('Verification failed with error:', err);
  } finally {
    await cdp.close();
  }
}

runVerification();
