const CDP = require('./cdp_helper.js');

const candidateCss = `
/* =========================================================
   Shreeyog About Page Hero — Desktop, Tablet & Mobile Fix
   ========================================================= */

/* Hide line-3 ("Builders") universally on About page */
.about-page .c-welcome .-w span.line-3[data-v-3d2952d6] {
  display: none !important;
}

/* Ensure Heading Stacking Context is ALWAYS above figure */
.about-page .c-welcome .-w[data-v-3d2952d6] {
  z-index: 25 !important;
}
.about-page .c-welcome .-w span.title[data-v-3d2952d6] {
  z-index: 25 !important;
  color: var(--c-black, #151415) !important;
}

/* =========================================================
   DESKTOP VIEW (>= 1024px)
   ========================================================= */
@media (min-width: 1024px) {
  .about-page .c-welcome[data-v-3d2952d6] {
    min-height: calc(var(--vh, 1vh) * 115) !important;
    padding-top: clamp(90px, 12vh, 140px) !important;
    padding-bottom: clamp(60px, 8vh, 100px) !important;
    position: relative !important;
    overflow: hidden !important;
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    justify-content: flex-start !important;
  }

  /* Decorative path */
  .about-page .c-welcome .about-welcome-path[data-v-3d2952d6] {
    position: absolute !important;
    inset: 0 !important;
    width: 100% !important;
    height: 100% !important;
    pointer-events: none !important;
    z-index: 1 !important;
  }

  /* Heading wrapper: clean centered layout */
  .about-page .c-welcome .-w[data-v-3d2952d6] {
    min-height: auto !important;
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    justify-content: center !important;
    width: 100% !important;
    max-width: 1200px !important;
    margin: 0 auto !important;
    padding: 0 var(--g-margin) !important;
    box-sizing: border-box !important;
    position: relative !important;
    z-index: 25 !important;
  }

  /* "About" */
  .about-page .c-welcome .-w span.line-1[data-v-3d2952d6] {
    display: block !important;
    font-family: var(--font-t-1), "OTJubilee-Platinum", Georgia, serif !important;
    font-size: clamp(5.5rem, 8.5vw, 9.5rem) !important;
    line-height: 0.95 !important;
    letter-spacing: -0.02em !important;
    text-align: center !important;
    margin: 0 0 0.15em 0 !important;
    position: relative !important;
    z-index: 25 !important;
    transform: none !important;
    white-space: nowrap !important;
  }

  /* "Shreeyog" */
  .about-page .c-welcome .-w span.line-2[data-v-3d2952d6] {
    display: block !important;
    font-family: var(--font-t-1), "OTJubilee-Platinum", Georgia, serif !important;
    font-size: clamp(5.5rem, 8.5vw, 9.5rem) !important;
    line-height: 0.95 !important;
    letter-spacing: -0.02em !important;
    text-align: center !important;
    margin: 0 0 clamp(2rem, 3.5vh, 3.5rem) 0 !important;
    position: relative !important;
    z-index: 25 !important;
    transform: none !important;
    white-space: nowrap !important;
  }

  /* Landmark Building Figure: positioned cleanly below "About Shreeyog" */
  .about-page .c-welcome > figure[data-v-3d2952d6] {
    position: relative !important;
    inset: auto !important;
    top: auto !important;
    bottom: auto !important;
    margin: 0 auto !important;
    width: clamp(380px, 36vw, 540px) !important;
    max-width: 90% !important;
    height: auto !important;
    aspect-ratio: 1024 / 931 !important;
    border-radius: 20px !important;
    overflow: hidden !important;
    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.16), 0 4px 16px rgba(0, 0, 0, 0.08) !important;
    border: 1px solid rgba(21, 20, 21, 0.08) !important;
    z-index: 10 !important;
    transform: none !important;
    display: block !important;
  }

  .about-page .c-welcome > figure[data-v-3d2952d6] img {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover !important;
    object-position: center top !important;
    display: block !important;
    border-radius: 19px !important;
  }
}

/* =========================================================
   MOBILE & TABLET VIEW (< 1024px)
   ========================================================= */
@media (max-width: 1023px) {
  .about-page .c-welcome[data-v-3d2952d6] {
    min-height: auto !important;
    padding-top: clamp(4.8rem, 13vw, 6.2rem) !important;
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
    opacity: 0.35 !important;
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
    z-index: 25 !important;
  }

  /* "About" on mobile */
  .about-page .c-welcome .-w span.line-1[data-v-3d2952d6],
  html .about-page .c-welcome .-w span.line-1[data-v-3d2952d6] {
    display: block !important;
    text-align: center !important;
    justify-self: center !important;
    font-family: var(--font-t-1), "OTJubilee-Platinum", Georgia, serif !important;
    font-size: clamp(2.6rem, 10vw, 4.2rem) !important;
    line-height: 1.0 !important;
    letter-spacing: -0.015em !important;
    color: var(--c-black, #151415) !important;
    margin: 0 auto 0.15rem auto !important;
    position: relative !important;
    z-index: 25 !important;
    white-space: nowrap !important;
    padding: 0 !important;
    transform: none !important;
  }

  /* "Shreeyog" on mobile */
  .about-page .c-welcome .-w span.line-2[data-v-3d2952d6],
  html .about-page .c-welcome .-w span.line-2[data-v-3d2952d6] {
    display: block !important;
    text-align: center !important;
    justify-self: center !important;
    font-family: var(--font-t-1), "OTJubilee-Platinum", Georgia, serif !important;
    font-size: clamp(2.6rem, 10vw, 4.2rem) !important;
    line-height: 1.0 !important;
    letter-spacing: -0.015em !important;
    color: var(--c-black, #151415) !important;
    margin: 0 auto clamp(1.0rem, 3.2vw, 1.6rem) auto !important;
    position: relative !important;
    z-index: 25 !important;
    white-space: nowrap !important;
    padding: 0 !important;
    transform: none !important;
  }

  /* Building Image on mobile */
  .about-page .c-welcome > figure[data-v-3d2952d6] {
    position: relative !important;
    inset: auto !important;
    margin: 0 auto !important;
    width: clamp(230px, 70vw, 310px) !important;
    max-width: calc(100% - var(--g-margin) * 2) !important;
    height: auto !important;
    aspect-ratio: 1024 / 931 !important;
    display: block !important;
    transform: none !important;
    border-radius: 16px !important;
    overflow: hidden !important;
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.06) !important;
    border: 1px solid rgba(21, 20, 21, 0.08) !important;
    z-index: 10 !important;
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

  /* Our Story Section */
  .about-page .c-brief[data-v-5662d5ad] {
    padding-top: clamp(2.5rem, 6vw, 3.5rem) !important;
    padding-bottom: clamp(3rem, 7vw, 4.5rem) !important;
    position: relative !important;
    margin-top: 0 !important;
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
    font-size: clamp(1.4rem, 4.5vw, 1.85rem) !important;
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

async function testCandidate() {
  const cdp = new CDP(9270);
  try {
    await cdp.connect('http://localhost:3000/about');

    const vps = [
      { name: 'desktop_1440', width: 1440, height: 900, mobile: false },
      { name: 'tablet_768', width: 768, height: 1024, mobile: true },
      { name: 'iphone_390', width: 390, height: 844, mobile: true },
      { name: 'android_360', width: 360, height: 740, mobile: true }
    ];

    for (const vp of vps) {
      console.log('Testing ' + vp.name + '...');
      await cdp.send('Emulation.setDeviceMetricsOverride', {
        width: vp.width,
        height: vp.height,
        deviceScaleFactor: vp.mobile ? 2 : 1,
        mobile: vp.mobile
      });

      // Inject candidate style
      await cdp.eval(`(() => {
        let s = document.getElementById('shreeyog-about-mobile-custom');
        if (!s) {
          s = document.createElement('style');
          s.id = 'shreeyog-about-mobile-custom';
          document.head.appendChild(s);
        }
        s.textContent = ${JSON.stringify(candidateCss)};
      })()`);
      await new Promise(r => setTimeout(r, 600));

      // Measure
      const metrics = await cdp.eval(`(() => {
        const l1 = document.querySelector('.c-welcome .-w span.line-1');
        const l2 = document.querySelector('.c-welcome .-w span.line-2');
        const l3 = document.querySelector('.c-welcome .-w span.line-3');
        const fig = document.querySelector('.c-welcome > figure');

        function b(el) {
          if (!el) return null;
          const r = el.getBoundingClientRect();
          const s = window.getComputedStyle(el);
          return {
            text: el.textContent.trim(),
            display: s.display,
            top: Math.round(r.top),
            bottom: Math.round(r.bottom),
            left: Math.round(r.left),
            right: Math.round(r.right),
            width: Math.round(r.width),
            height: Math.round(r.height),
            fontSize: s.fontSize,
            lineHeight: s.lineHeight
          };
        }

        const b1 = b(l1), b2 = b(l2), b3 = b(l3), bf = b(fig);
        return {
          l1: b1,
          l2: b2,
          l3: b3,
          fig: bf,
          gapL1ToL2: b2 && b1 ? b2.top - b1.bottom : null,
          gapL2ToFig: bf && b2 ? bf.top - b2.bottom : null,
          hasHorizontalScroll: document.documentElement.scrollWidth > window.innerWidth + 1
        };
      })()`);

      console.log(vp.name + ' metrics:', JSON.stringify(metrics, null, 2));

      await cdp.screenshot('C:/Users/supri/.gemini/antigravity/brain/052d3503-3ffa-4c2b-b51f-0571d6a9d35d/candidate_' + vp.name + '.png');
      console.log('Saved candidate_' + vp.name + '.png');
    }
  } finally {
    await cdp.close();
  }
}

testCandidate();
