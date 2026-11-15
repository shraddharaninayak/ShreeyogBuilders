const CDP = require('./cdp_helper.js');
const fs = require('fs');

const ARTIFACT_DIR = 'C:/Users/supri/.gemini/antigravity/brain/052d3503-3ffa-4c2b-b51f-0571d6a9d35d';

const testCss = `
@media (max-width: 1023px) {
  .about-page .c-welcome[data-v-3d2952d6] {
    min-height: auto !important;
    padding-top: clamp(5rem, 14vw, 6.5rem) !important;
    padding-bottom: clamp(1.5rem, 4vw, 2.5rem) !important;
    margin-bottom: 0 !important;
    overflow: hidden !important;
    position: relative !important;
    background-image: url(/images/about/w-bg.webp) !important;
    background-position: top center !important;
    background-size: cover !important;
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
  }

  .about-page .c-welcome[data-v-3d2952d6]:after {
    display: none !important;
  }

  .about-page .c-welcome .about-welcome-path[data-v-3d2952d6] {
    position: absolute !important;
    inset: 0 !important;
    width: 100% !important;
    height: 100% !important;
    pointer-events: none !important;
    opacity: 0.3 !important;
    z-index: 1 !important;
  }

  .about-page .c-welcome .-w[data-v-3d2952d6] {
    min-height: auto !important;
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    justify-content: center !important;
    margin: 0 auto !important;
    padding: 0 var(--g-margin) !important;
    width: 100% !important;
    max-width: 600px !important;
    box-sizing: border-box !important;
    position: relative !important;
    z-index: 10 !important;
  }

  .about-page .c-welcome .-w span.line-1[data-v-3d2952d6] {
    display: block !important;
    text-align: center !important;
    justify-self: center !important;
    font-family: var(--font-t-1), "OTJubilee-Platinum", Georgia, serif !important;
    font-size: clamp(3.2rem, 13vw, 5.2rem) !important;
    line-height: 1 !important;
    letter-spacing: -0.015em !important;
    color: var(--c-black, #151415) !important;
    margin: 0 auto clamp(1.25rem, 3vw, 2rem) auto !important;
    position: relative !important;
    z-index: 10 !important;
    white-space: nowrap !important;
    padding: 0 !important;
  }

  .about-page .c-welcome .-w span.line-2[data-v-3d2952d6],
  .about-page .c-welcome .-w span.line-3[data-v-3d2952d6] {
    display: none !important;
  }

  .about-page .c-welcome > figure[data-v-3d2952d6] {
    position: relative !important;
    inset: auto !important;
    margin: 0 auto !important;
    width: clamp(240px, 72vw, 320px) !important;
    max-width: calc(100% - var(--g-margin) * 2) !important;
    height: auto !important;
    aspect-ratio: 1024 / 931 !important;
    display: block !important;
    transform: none !important;
    border-radius: 16px !important;
    overflow: hidden !important;
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.14), 0 2px 8px rgba(0, 0, 0, 0.08) !important;
    border: 1px solid rgba(21, 20, 21, 0.08) !important;
    z-index: 5 !important;
    pointer-events: none !important;
  }

  .about-page .c-welcome > figure[data-v-3d2952d6] img {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover !important;
    object-position: center top !important;
    display: block !important;
    border-radius: 15px !important;
  }

  .about-page .c-brief[data-v-5662d5ad] {
    padding-top: clamp(2.5rem, 6vw, 3.5rem) !important;
    padding-bottom: clamp(3rem, 7vw, 4.5rem) !important;
    position: relative !important;
  }

  .about-page .c-brief .-w[data-v-5662d5ad] {
    display: flex !important;
    flex-direction: column !important;
    align-items: flex-start !important;
    margin: 0 auto !important;
    padding: 0 var(--g-margin) !important;
    width: 100% !important;
    max-width: 600px !important;
    box-sizing: border-box !important;
  }

  .about-page .c-brief .-w .caption[data-v-5662d5ad] {
    display: block !important;
    width: 100% !important;
    font-family: var(--font-t-1), "OTJubilee-Platinum", Georgia, serif !important;
    font-size: clamp(1.4rem, 4.6vw, 1.85rem) !important;
    line-height: 1.45 !important;
    letter-spacing: -0.01em !important;
    color: var(--c-black, #151415) !important;
    margin: 0 0 1.5rem 0 !important;
    padding: 0 !important;
  }

  .about-page .c-brief .-w .caption .indent[data-v-5662d5ad] {
    display: none !important;
  }

  .about-page .c-brief .-w .subtitle[data-v-5662d5ad] {
    display: block !important;
    width: 100% !important;
    font-family: var(--font-t-1), "OTJubilee-Platinum", Georgia, serif !important;
    font-size: clamp(1.15rem, 3.4vw, 1.4rem) !important;
    line-height: 1.45 !important;
    color: #8c734b !important;
    margin: 0 0 1.25rem 0 !important;
    padding: 0 !important;
  }

  .about-page .c-brief .-w .p-1[data-v-5662d5ad] {
    display: block !important;
    width: 100% !important;
    font-family: var(--font-b-regular), "Switzer-Regular", -apple-system, sans-serif !important;
    font-size: clamp(0.92rem, 2.7vw, 1.05rem) !important;
    line-height: 1.65 !important;
    color: rgba(21, 20, 21, 0.76) !important;
    margin: 0 0 2rem 0 !important;
    padding: 0 !important;
  }

  .about-page .c-brief .-w .-l[data-v-5662d5ad],
  .about-page .c-brief .-w .-r[data-v-5662d5ad] {
    display: none !important;
  }

  .about-page .c-brief .figure-map[data-v-5662d5ad] {
    opacity: 0.15 !important;
    pointer-events: none !important;
    z-index: 1 !important;
  }
}
`;

async function testAboutFix() {
  const cdp = new CDP(9263);
  try {
    console.log('Connecting to http://localhost:3000/about at 390x844...');
    await cdp.connect('http://localhost:3000/about');
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true
    });

    for (let i = 0; i < 40; i++) {
      const ready = await cdp.eval(`!!(document.documentElement && document.documentElement.classList.contains('-ready'))`);
      if (ready) break;
      await new Promise(r => setTimeout(r, 200));
    }
    await new Promise(r => setTimeout(r, 2000));

    // Dismiss cookie
    await cdp.eval(`(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Accept'));
      if (btn) btn.click();
    })()`);
    await new Promise(r => setTimeout(r, 400));

    // Inject CSS
    await cdp.eval(`(() => {
      const style = document.createElement('style');
      style.id = 'test-about-custom-css';
      style.textContent = ${JSON.stringify(testCss)};
      document.head.appendChild(style);
    })()`);
    await new Promise(r => setTimeout(r, 600));

    // Take screenshots of top view and story view
    await cdp.screenshot(`${ARTIFACT_DIR}/about_mobile_test_01_top.png`);
    console.log('Saved about_mobile_test_01_top.png');

    // Scroll down to Our Story
    await cdp.eval(`(() => {
      const brief = document.querySelector('.c-brief');
      if (brief) brief.scrollIntoView({ behavior: 'instant', block: 'start' });
    })()`);
    await new Promise(r => setTimeout(r, 600));

    await cdp.screenshot(`${ARTIFACT_DIR}/about_mobile_test_02_story.png`);
    console.log('Saved about_mobile_test_02_story.png');

    // Get metrics
    const metrics = await cdp.eval(`(() => {
      const l1 = document.querySelector('.c-welcome .-w span.line-1');
      const fig = document.querySelector('.c-welcome > figure');
      const caption = document.querySelector('.c-brief .-w .caption');

      function b(el) {
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return {
          top: Math.round(r.top),
          bottom: Math.round(r.bottom),
          left: Math.round(r.left),
          right: Math.round(r.right),
          width: Math.round(r.width),
          height: Math.round(r.height)
        };
      }

      function overlaps(a, b) {
        if (!a || !b) return false;
        return !(a.right <= b.left || a.left >= b.right || a.bottom <= b.top || a.top >= b.bottom);
      }

      const bl = b(l1), bf = b(fig), bc = b(caption);

      return {
        line1: bl,
        fig: bf,
        caption: bc,
        overlaps: {
          'line1 vs fig': overlaps(bl, bf),
          'fig vs caption': overlaps(bf, bc)
        }
      };
    })()`);

    console.log('TEST METRICS:');
    console.log(JSON.stringify(metrics, null, 2));

  } finally {
    await cdp.close();
  }
}

testAboutFix();
