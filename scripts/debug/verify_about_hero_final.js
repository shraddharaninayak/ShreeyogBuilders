const CDP = require('./cdp_helper.js');
const fs = require('fs');

const ARTIFACT_DIR = 'C:/Users/supri/.gemini/antigravity/brain/052d3503-3ffa-4c2b-b51f-0571d6a9d35d';

const viewports = [
  { name: 'desktop_1440', width: 1440, height: 900, mobile: false },
  { name: 'tablet_768', width: 768, height: 1024, mobile: true },
  { name: 'iphone_promax_430', width: 430, height: 932, mobile: true },
  { name: 'iphone_14_390', width: 390, height: 844, mobile: true },
  { name: 'android_360', width: 360, height: 740, mobile: true }
];

async function verifyFinal() {
  const cdp = new CDP(9275);
  const results = {};

  try {
    console.log('Connecting to http://localhost:3000/about on port 9275...');
    await cdp.connect('http://localhost:3000/about');
    await new Promise(r => setTimeout(r, 1000));

    for (const vp of viewports) {
      console.log(`\n========================================`);
      console.log(`Verifying: ${vp.name} (${vp.width}x${vp.height})`);
      console.log(`========================================`);

      await cdp.send('Emulation.setDeviceMetricsOverride', {
        width: vp.width,
        height: vp.height,
        deviceScaleFactor: vp.mobile ? 2 : 1,
        mobile: vp.mobile
      });

      // Reload so stylesheet and media queries apply fresh
      await cdp.send('Page.reload');

      // Wait for Nuxt ready
      for (let i = 0; i < 40; i++) {
        const ready = await cdp.eval(`!!(document.documentElement && document.documentElement.classList.contains('-ready'))`);
        if (ready) break;
        await new Promise(r => setTimeout(r, 150));
      }
      await new Promise(r => setTimeout(r, 1200));

      // Dismiss cookie banner if present
      await cdp.eval(`(() => {
        const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Accept'));
        if (btn) btn.click();
      })()`);
      await new Promise(r => setTimeout(r, 300));

      // Measure layout metrics
      const metrics = await cdp.eval(`(() => {
        const docW = document.documentElement.scrollWidth;
        const winW = window.innerWidth;
        const l1 = document.querySelector('.c-welcome .-w span.line-1');
        const l2 = document.querySelector('.c-welcome .-w span.line-2');
        const l3 = document.querySelector('.c-welcome .-w span.line-3');
        const fig = document.querySelector('.c-welcome > figure');
        const figImg = document.querySelector('.c-welcome > figure img');
        const brief = document.querySelector('.c-brief .-w .caption');

        function getBox(el) {
          if (!el) return null;
          const r = el.getBoundingClientRect();
          const s = window.getComputedStyle(el);
          return {
            text: el.textContent.trim(),
            top: Math.round(r.top),
            bottom: Math.round(r.bottom),
            left: Math.round(r.left),
            right: Math.round(r.right),
            width: Math.round(r.width),
            height: Math.round(r.height),
            display: s.display,
            visibility: s.visibility,
            opacity: s.opacity,
            fontSize: s.fontSize,
            lineHeight: s.lineHeight
          };
        }

        const bL1 = getBox(l1);
        const bL2 = getBox(l2);
        const bL3 = getBox(l3);
        const bFig = getBox(fig);
        const bBrief = getBox(brief);

        // Gap between Line 1 and Line 2
        let gapL1ToL2 = null;
        if (bL1 && bL2) {
          gapL1ToL2 = bL2.top - bL1.bottom;
        }

        // Gap between Line 2 and Figure
        let gapL2ToFig = null;
        if (bL2 && bFig) {
          gapL2ToFig = bFig.top - bL2.bottom;
        }

        // Gap between Figure and Brief
        let gapFigToBrief = null;
        if (bFig && bBrief) {
          gapFigToBrief = bBrief.top - bFig.bottom;
        }

        // Centering check for Figure
        let figCentered = false;
        if (bFig) {
          const marginL = bFig.left;
          const marginR = winW - bFig.right;
          figCentered = Math.abs(marginL - marginR) <= 4;
        }

        return {
          viewport: { width: winW, height: window.innerHeight },
          hasHorizontalScroll: docW > winW + 1,
          scrollWidth: docW,
          line1: bL1,
          line2: bL2,
          line3: bL3,
          fig: bFig,
          figCentered: figCentered,
          gapL1ToL2: gapL1ToL2,
          gapL2ToFig: gapL2ToFig,
          gapFigToBrief: gapFigToBrief,
          brief: bBrief
        };
      })()`);

      console.log('Metrics:', JSON.stringify(metrics, null, 2));
      results[vp.name] = metrics;

      // Screenshot 1: Top Hero
      const topImg = `${ARTIFACT_DIR}/final_hero_${vp.name}_top.png`;
      await cdp.screenshot(topImg);
      console.log(`Saved screenshot: ${topImg}`);

      // Screenshot 2: Scrolled to Our Story
      await cdp.eval(`(() => {
        const brief = document.querySelector('.c-brief');
        if (brief) brief.scrollIntoView({ behavior: 'instant', block: 'start' });
        else window.scrollTo(0, 600);
      })()`);
      await new Promise(r => setTimeout(r, 600));

      const storyImg = `${ARTIFACT_DIR}/final_hero_${vp.name}_story.png`;
      await cdp.screenshot(storyImg);
      console.log(`Saved screenshot: ${storyImg}`);
    }

    fs.writeFileSync(`${ARTIFACT_DIR}/final_hero_verification_results.json`, JSON.stringify(results, null, 2));
    console.log('\n--- Final Hero Verification Complete! Saved final_hero_verification_results.json ---');

  } finally {
    await cdp.close();
  }
}

verifyFinal();
