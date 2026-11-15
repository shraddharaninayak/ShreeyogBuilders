const CDP = require('./cdp_helper.js');
const fs = require('fs');

const ARTIFACT_DIR = 'C:/Users/supri/.gemini/antigravity/brain/052d3503-3ffa-4c2b-b51f-0571d6a9d35d';

const viewports = [
  { name: '360_small_android', width: 360, height: 740, mobile: true },
  { name: '390_iphone_14', width: 390, height: 844, mobile: true },
  { name: '430_iphone_promax', width: 430, height: 932, mobile: true },
  { name: '768_tablet_portrait', width: 768, height: 1024, mobile: true },
  { name: '1440_desktop_check', width: 1440, height: 900, mobile: false }
];

async function runVerification() {
  const cdp = new CDP(9264);
  const results = {};

  try {
    console.log('Starting Chrome on port 9264...');
    await cdp.connect('http://localhost:3000/about');
    await new Promise(r => setTimeout(r, 1000));

    for (const vp of viewports) {
      console.log(`\n========================================`);
      console.log(`Testing Viewport: ${vp.name} (${vp.width}x${vp.height})`);
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
        const brief = document.querySelector('.c-brief');
        const caption = document.querySelector('.c-brief .-w .caption');

        function getBox(el) {
          if (!el) return null;
          const r = el.getBoundingClientRect();
          const s = window.getComputedStyle(el);
          return {
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
        const bCaption = getBox(caption);

        // Gap between Line 1 and Figure
        let gapL1ToFig = null;
        if (bL1 && bFig) {
          gapL1ToFig = bFig.top - bL1.bottom;
        }

        // Gap between Figure and Caption
        let gapFigToCaption = null;
        if (bFig && bCaption) {
          gapFigToCaption = bCaption.top - bFig.bottom;
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
          caption: bCaption,
          gapL1ToFig: gapL1ToFig,
          gapFigToCaption: gapFigToCaption,
          isDesktop: winW >= 1024
        };
      })()`);

      console.log('Metrics:', JSON.stringify(metrics, null, 2));
      results[vp.name] = metrics;

      // Capture screenshot 1: Top / Hero
      const topImgPath = `${ARTIFACT_DIR}/about_vp_${vp.name}_top.png`;
      await cdp.screenshot(topImgPath);
      console.log(`Saved screenshot: ${topImgPath}`);

      if (vp.mobile) {
        // Scroll down to Our Story
        await cdp.eval(`(() => {
          const brief = document.querySelector('.c-brief');
          if (brief) brief.scrollIntoView({ behavior: 'instant', block: 'start' });
        })()`);
        await new Promise(r => setTimeout(r, 600));

        const storyImgPath = `${ARTIFACT_DIR}/about_vp_${vp.name}_story.png`;
        await cdp.screenshot(storyImgPath);
        console.log(`Saved screenshot: ${storyImgPath}`);
      } else {
        // Desktop scrolled check
        await cdp.eval(`window.scrollTo(0, 700)`);
        await new Promise(r => setTimeout(r, 600));
        const deskScrolledPath = `${ARTIFACT_DIR}/about_vp_${vp.name}_scrolled.png`;
        await cdp.screenshot(deskScrolledPath);
        console.log(`Saved screenshot: ${deskScrolledPath}`);
      }
    }

    // Save results summary JSON
    fs.writeFileSync(`${ARTIFACT_DIR}/about_verification_results.json`, JSON.stringify(results, null, 2));
    console.log('\nVerification complete! Saved about_verification_results.json');
  } finally {
    await cdp.close();
  }
}

runVerification();
