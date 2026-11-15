const fs = require('fs');

const completeAboutHeroCss = `
/* =========================================================
   Shreeyog About Page Hero — Complete Desktop & Mobile Fix
   ========================================================= */

/* 1. Universal: Always hide line-3 ("Builders") on About page */
.about-page .c-welcome .-w span.line-3[data-v-3d2952d6],
html body .about-page .c-welcome .-w span.line-3[data-v-3d2952d6] {
  display: none !important;
}

/* 2. Universal Stacking & Typography for Heading */
.about-page .c-welcome .-w[data-v-3d2952d6],
html body .about-page .c-welcome .-w[data-v-3d2952d6] {
  position: relative !important;
  z-index: 25 !important;
}
.about-page .c-welcome .-w span.title[data-v-3d2952d6],
html body .about-page .c-welcome .-w span.title[data-v-3d2952d6] {
  position: relative !important;
  z-index: 25 !important;
  color: var(--c-black, #151415) !important;
  pointer-events: auto !important;
}

/* =========================================================
   DESKTOP VIEW (>= 1024px)
   ========================================================= */
@media (min-width: 1024px) {
  /* Hero Container: Natural height, spacious and well-proportioned */
  .about-page .c-welcome[data-v-3d2952d6],
  html body .about-page .c-welcome[data-v-3d2952d6] {
    min-height: auto !important;
    padding-top: clamp(100px, 12vh, 140px) !important;
    padding-bottom: clamp(60px, 8vh, 100px) !important;
    margin-bottom: 0 !important;
    position: relative !important;
    overflow: hidden !important;
    background-image: url(/images/about/w-bg.webp) !important;
    background-position: top center !important;
    background-repeat: no-repeat !important;
    background-size: cover !important;
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    justify-content: flex-start !important;
  }

  /* Remove any overlay that could darken or clip */
  .about-page .c-welcome[data-v-3d2952d6]:after,
  html body .about-page .c-welcome[data-v-3d2952d6]:after {
    display: none !important;
  }

  /* Decorative gold wave path: elegant background ribbon */
  .about-page .c-welcome .about-welcome-path[data-v-3d2952d6],
  html body .about-page .c-welcome .about-welcome-path[data-v-3d2952d6] {
    position: absolute !important;
    inset: 0 !important;
    width: 100% !important;
    height: 100% !important;
    pointer-events: none !important;
    z-index: 1 !important;
    opacity: 0.55 !important;
  }

  /* Heading wrapper: vertical column */
  .about-page .c-welcome .-w[data-v-3d2952d6],
  html body .about-page .c-welcome .-w[data-v-3d2952d6] {
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

  /* Word 1: "About" */
  .about-page .c-welcome .-w span.line-1[data-v-3d2952d6],
  html body .about-page .c-welcome .-w span.line-1[data-v-3d2952d6] {
    display: block !important;
    font-family: var(--font-t-1), "OTJubilee-Platinum", Georgia, serif !important;
    font-size: clamp(5.0rem, 7.5vw, 8.5rem) !important;
    line-height: 0.95 !important;
    letter-spacing: -0.02em !important;
    text-align: center !important;
    justify-self: center !important;
    margin: 0 auto 0.12em auto !important;
    position: relative !important;
    z-index: 25 !important;
    transform: none !important;
    white-space: nowrap !important;
  }

  /* Word 2: "Shreeyog" */
  .about-page .c-welcome .-w span.line-2[data-v-3d2952d6],
  html body .about-page .c-welcome .-w span.line-2[data-v-3d2952d6] {
    display: block !important;
    font-family: var(--font-t-1), "OTJubilee-Platinum", Georgia, serif !important;
    font-size: clamp(5.0rem, 7.5vw, 8.5rem) !important;
    line-height: 0.95 !important;
    letter-spacing: -0.02em !important;
    text-align: center !important;
    justify-self: center !important;
    margin: 0 auto clamp(2.5rem, 4.5vh, 4.0rem) auto !important;
    position: relative !important;
    z-index: 25 !important;
    transform: none !important;
    white-space: nowrap !important;
  }

  /* Landmark Building Figure: positioned cleanly BELOW heading with zero overlap */
  .about-page .c-welcome > figure[data-v-3d2952d6],
  html body .about-page .c-welcome > figure[data-v-3d2952d6] {
    position: relative !important;
    inset: auto !important;
    top: auto !important;
    bottom: auto !important;
    left: auto !important;
    right: auto !important;
    margin: 0 auto !important;
    width: clamp(380px, 34vw, 500px) !important;
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

  .about-page .c-welcome > figure[data-v-3d2952d6] img,
  html body .about-page .c-welcome > figure[data-v-3d2952d6] img {
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
  /* Hero Container */
  .about-page .c-welcome[data-v-3d2952d6],
  html body .about-page .c-welcome[data-v-3d2952d6] {
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

  .about-page .c-welcome[data-v-3d2952d6]:after,
  html body .about-page .c-welcome[data-v-3d2952d6]:after {
    display: none !important;
  }

  /* Decorative SVG wave */
  .about-page .c-welcome .about-welcome-path[data-v-3d2952d6],
  html body .about-page .c-welcome .about-welcome-path[data-v-3d2952d6] {
    position: absolute !important;
    inset: 0 !important;
    width: 100% !important;
    height: 100% !important;
    pointer-events: none !important;
    opacity: 0.35 !important;
    z-index: 1 !important;
  }

  /* Hero wrapper */
  .about-page .c-welcome .-w[data-v-3d2952d6],
  html body .about-page .c-welcome .-w[data-v-3d2952d6] {
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

  /* Word 1: "About" on mobile */
  .about-page .c-welcome .-w span.line-1[data-v-3d2952d6],
  html body .about-page .c-welcome .-w span.line-1[data-v-3d2952d6] {
    display: block !important;
    text-align: center !important;
    justify-self: center !important;
    font-family: var(--font-t-1), "OTJubilee-Platinum", Georgia, serif !important;
    font-size: clamp(2.6rem, 10vw, 4.0rem) !important;
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

  /* Word 2: "Shreeyog" on mobile */
  .about-page .c-welcome .-w span.line-2[data-v-3d2952d6],
  html body .about-page .c-welcome .-w span.line-2[data-v-3d2952d6] {
    display: block !important;
    text-align: center !important;
    justify-self: center !important;
    font-family: var(--font-t-1), "OTJubilee-Platinum", Georgia, serif !important;
    font-size: clamp(2.6rem, 10vw, 4.0rem) !important;
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

  /* Landmark Building Figure on mobile */
  .about-page .c-welcome > figure[data-v-3d2952d6],
  html body .about-page .c-welcome > figure[data-v-3d2952d6] {
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

  .about-page .c-welcome > figure[data-v-3d2952d6] img,
  html body .about-page .c-welcome > figure[data-v-3d2952d6] img {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover !important;
    object-position: center top !important;
    display: block !important;
    border-radius: 15px !important;
  }

  /* Our Story Section */
  .about-page .c-brief[data-v-5662d5ad],
  html body .about-page .c-brief[data-v-5662d5ad] {
    padding-top: clamp(2.5rem, 6vw, 3.5rem) !important;
    padding-bottom: clamp(3rem, 7vw, 4.5rem) !important;
    position: relative !important;
    margin-top: 0 !important;
  }

  .about-page .c-brief .-w[data-v-5662d5ad],
  html body .about-page .c-brief .-w[data-v-5662d5ad] {
    display: flex !important;
    flex-direction: column !important;
    align-items: flex-start !important;
    margin: 0 auto !important;
    padding: 0 var(--g-margin) !important;
    width: 100% !important;
    max-width: 600px !important;
    box-sizing: border-box !important;
  }

  .about-page .c-brief .-w .caption[data-v-5662d5ad],
  html body .about-page .c-brief .-w .caption[data-v-5662d5ad] {
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

  .about-page .c-brief .-w .caption .indent[data-v-5662d5ad],
  html body .about-page .c-brief .-w .caption .indent[data-v-5662d5ad] {
    display: none !important;
  }

  .about-page .c-brief .-w .subtitle[data-v-5662d5ad],
  html body .about-page .c-brief .-w .subtitle[data-v-5662d5ad] {
    display: block !important;
    width: 100% !important;
    font-family: var(--font-t-1), "OTJubilee-Platinum", Georgia, serif !important;
    font-size: clamp(1.15rem, 3.4vw, 1.4rem) !important;
    line-height: 1.45 !important;
    color: #8c734b !important;
    margin: 0 0 1.25rem 0 !important;
    padding: 0 !important;
  }

  .about-page .c-brief .-w .p-1[data-v-5662d5ad],
  html body .about-page .c-brief .-w .p-1[data-v-5662d5ad] {
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
  .about-page .c-brief .-w .-r[data-v-5662d5ad],
  html body .about-page .c-brief .-w .-l[data-v-5662d5ad],
  html body .about-page .c-brief .-w .-r[data-v-5662d5ad] {
    display: none !important;
  }

  .about-page .c-brief .figure-map[data-v-5662d5ad],
  html body .about-page .c-brief .figure-map[data-v-5662d5ad] {
    opacity: 0.15 !important;
    pointer-events: none !important;
    z-index: 1 !important;
  }
}
`;

// 1. Update public/_nuxt/about.5756c083.css
const cssFile = 'public/_nuxt/about.5756c083.css';
if (fs.existsSync(cssFile)) {
  let css = fs.readFileSync(cssFile, 'utf8');
  if (css.includes('Shreeyog About Page')) {
    const start = css.indexOf('/* =========================================================\n   Shreeyog About Page');
    css = css.slice(0, start) + completeAboutHeroCss;
  } else {
    css += '\n' + completeAboutHeroCss;
  }
  fs.writeFileSync(cssFile, css, 'utf8');
  console.log(`Updated ${cssFile}`);
}

// 2. Update public/about/index.html
const htmlFile = 'public/about/index.html';
if (fs.existsSync(htmlFile)) {
  let html = fs.readFileSync(htmlFile, 'utf8');
  const styleTag = `<style id="shreeyog-about-hero-complete">${completeAboutHeroCss}</style>`;
  if (html.includes('id="shreeyog-about-hero-complete"')) {
    const start = html.indexOf('<style id="shreeyog-about-hero-complete">');
    const end = html.indexOf('</style>', start) + 8;
    html = html.slice(0, start) + styleTag + html.slice(end);
  } else if (html.includes('id="shreeyog-about-mobile-custom"')) {
    const start = html.indexOf('<style id="shreeyog-about-mobile-custom">');
    const end = html.indexOf('</style>', start) + 8;
    html = html.slice(0, start) + styleTag + html.slice(end);
  } else {
    html = html.replace('</head>', `${styleTag}\n</head>`);
  }
  fs.writeFileSync(htmlFile, html, 'utf8');
  console.log(`Updated ${htmlFile}`);
}

// 3. Update pages/about.html
const pageFile = 'pages/about.html';
if (fs.existsSync(pageFile)) {
  let html = fs.readFileSync(pageFile, 'utf8');
  const styleTag = `<style id="shreeyog-about-hero-complete">${completeAboutHeroCss}</style>`;
  if (html.includes('id="shreeyog-about-hero-complete"')) {
    const start = html.indexOf('<style id="shreeyog-about-hero-complete">');
    const end = html.indexOf('</style>', start) + 8;
    html = html.slice(0, start) + styleTag + html.slice(end);
  } else if (html.includes('id="shreeyog-about-mobile-custom"')) {
    const start = html.indexOf('<style id="shreeyog-about-mobile-custom">');
    const end = html.indexOf('</style>', start) + 8;
    html = html.slice(0, start) + styleTag + html.slice(end);
  } else {
    html = html.replace('</head>', `${styleTag}\n</head>`);
  }
  fs.writeFileSync(pageFile, html, 'utf8');
  console.log(`Updated ${pageFile}`);
}

console.log('--- About Page Hero Complete Fix Successfully Applied ---');
