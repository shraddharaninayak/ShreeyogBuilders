const CDP = require('./cdp_helper.js');
const fs = require('fs');

const ARTIFACT_DIR = 'C:/Users/supri/.gemini/antigravity/brain/ff998ab5-1a3d-42c3-84d4-6774c67af56b';

async function testHeroScroll() {
  const cdp = new CDP(9233);
  try {
    console.log('Connecting to http://localhost:3000/ ...');
    await cdp.connect('http://localhost:3000/');
    
    // Poll until .c-welcome is mounted
    for (let i = 0; i < 30; i++) {
      const exists = await cdp.eval(`!!document.querySelector('.c-welcome')`);
      if (exists) break;
      await new Promise(r => setTimeout(r, 200));
    }
    await new Promise(r => setTimeout(r, 3000));

    async function getHeroState() {
      return await cdp.eval(`(() => {
        const welcome = document.querySelector('.c-welcome');
        if (!welcome) return { error: 'no c-welcome' };
        
        function getElInfo(sel) {
          const el = document.querySelector(sel);
          if (!el) return null;
          const rect = el.getBoundingClientRect();
          const cs = window.getComputedStyle(el);
          return {
            tag: el.tagName,
            rect: { top: Math.round(rect.top), left: Math.round(rect.left), width: Math.round(rect.width), height: Math.round(rect.height) },
            transform: cs.transform,
            opacity: cs.opacity,
            visibility: cs.visibility,
            inlineStyle: el.getAttribute('style') || '',
            progressVar: cs.getPropertyValue('--progress').trim(),
            yVar: cs.getPropertyValue('--y').trim(),
            classes: el.className
          };
        }

        return {
          scrollY: window.scrollY,
          welcomeRect: { top: Math.round(welcome.getBoundingClientRect().top), height: Math.round(welcome.getBoundingClientRect().height) },
          welcomeStyle: welcome.getAttribute('style') || '',
          welcomeProgress: window.getComputedStyle(welcome).getPropertyValue('--progress').trim(),
          welcomeClasses: welcome.className,
          line1: getElInfo('.c-welcome .-w span.line-1'),
          line2: getElInfo('.c-welcome .-w span.line-2'),
          line3: getElInfo('.c-welcome .-w span.line-3'),
          line1m: getElInfo('.c-welcome .-w .line-1-m'),
          line2m: getElInfo('.c-welcome .-w .line-2-m'),
          cta: getElInfo('.c-welcome .-w .cta'),
          stone: getElInfo('.c-welcome .-w .stone'),
          places: getElInfo('.c-welcome .-w .places'),
          items: getElInfo('.c-welcome .-w .items'),
          welcomePath: getElInfo('.c-welcome .welcome-path')
        };
      })()`);
    }

    async function saveScreenshot(filename) {
      const p = `${ARTIFACT_DIR}/${filename}`;
      await cdp.screenshot(p);
      console.log('Saved screenshot:', filename);
    }

    console.log('\n--- 1. INITIAL STATE AT TOP (scrollY = 0) ---');
    const s0 = await getHeroState();
    console.log(JSON.stringify(s0, null, 2));
    await saveScreenshot('hero_reproduce_01_initial.png');

    // Scroll down 1200px
    console.log('\n--- SCROLLING DOWN TO 1200px ---');
    await cdp.eval(`window.scrollTo(0, 1200)`);
    await new Promise(r => setTimeout(r, 1000));
    await saveScreenshot('hero_reproduce_02_scrolled_down.png');

    // Scroll down 2500px
    console.log('\n--- SCROLLING DOWN TO 2500px ---');
    await cdp.eval(`window.scrollTo(0, 2500)`);
    await new Promise(r => setTimeout(r, 1000));

    // Scroll back to top 0px
    console.log('\n--- SCROLLING BACK UP TO 0px ---');
    await cdp.eval(`window.scrollTo(0, 0)`);
    await new Promise(r => setTimeout(r, 1500));

    console.log('\n--- 2. STATE AFTER SCROLLING BACK TO TOP ---');
    const s1 = await getHeroState();
    console.log(JSON.stringify(s1, null, 2));
    await saveScreenshot('hero_reproduce_03_back_at_top.png');

    // Repeat 3 times to see if transforms accumulate
    for (let round = 1; round <= 3; round++) {
      console.log(`\n--- REPEAT CYCLE ${round}: SCROLL DOWN THEN BACK UP ---`);
      await cdp.eval(`window.scrollTo(0, 2000)`);
      await new Promise(r => setTimeout(r, 600));
      await cdp.eval(`window.scrollTo(0, 0)`);
      await new Promise(r => setTimeout(r, 1000));
    }

    console.log('\n--- 3. STATE AFTER 3 REPEATED CYCLES ---');
    const sRepeat = await getHeroState();
    console.log(JSON.stringify(sRepeat, null, 2));
    await saveScreenshot('hero_reproduce_04_after_3_cycles.png');

  } finally {
    await cdp.close();
  }
}

testHeroScroll().catch(console.error);
