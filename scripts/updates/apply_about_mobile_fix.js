const fs = require('fs');

const aboutMobileCss = `
/* =========================================================
   Shreeyog About Page Responsive Mobile Layout (< 1024px)
   ========================================================= */
@media (max-width: 1023px) {
  /* 1. Hero Section: Natural height, spacious and well-proportioned */
  .about-page .c-welcome[data-v-3d2952d6] {
    min-height: auto !important;
    padding-top: clamp(5.2rem, 14vw, 6.8rem) !important;
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

  /* Remove distracting bottom-only gradient overlay on mobile */
  .about-page .c-welcome[data-v-3d2952d6]:after {
    display: none !important;
  }

  /* Decorative SVG wave: subtle and non-interfering */
  .about-page .c-welcome .about-welcome-path[data-v-3d2952d6] {
    position: absolute !important;
    inset: 0 !important;
    width: 100% !important;
    height: 100% !important;
    pointer-events: none !important;
    opacity: 0.3 !important;
    z-index: 1 !important;
  }

  /* Hero wrapper becomes clean vertical stack */
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

  /* Hero Headline: "About" - Fully visible, prominent, elegant */
  .about-page .c-welcome .-w span.line-1[data-v-3d2952d6] {
    display: block !important;
    text-align: center !important;
    justify-self: center !important;
    font-family: var(--font-t-1), "OTJubilee-Platinum", Georgia, serif !important;
    font-size: clamp(3.2rem, 13vw, 5.0rem) !important;
    line-height: 1 !important;
    letter-spacing: -0.015em !important;
    color: var(--c-black, #151415) !important;
    margin: 0 auto clamp(1.25rem, 3.5vw, 2rem) auto !important;
    position: relative !important;
    z-index: 10 !important;
    white-space: nowrap !important;
    padding: 0 !important;
  }

  /* Secondary desktop lines hidden on mobile to give "About" clean prominence */
  .about-page .c-welcome .-w span.line-2[data-v-3d2952d6],
  .about-page .c-welcome .-w span.line-3[data-v-3d2952d6] {
    display: none !important;
  }

  /* 2. Building Image: Perfectly centered, proportional, no awkward stretching */
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
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.06) !important;
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

  /* 3. Our Story Section: Readable, well-padded, and balanced */
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

  /* Main narrative statement ("Founded in 1992 by B. M. Kale...") */
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

  /* Remove 78px desktop indent on mobile for maximum readability */
  .about-page .c-brief .-w .caption .indent[data-v-5662d5ad] {
    display: none !important;
  }

  /* Subtitle: "Three Decades of Building Trust..." */
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

  /* Supporting Paragraph: "From the first foundation to the finest interior detail..." */
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

  /* Hide awkward rotated desktop side labels on mobile */
  .about-page .c-brief .-w .-l[data-v-5662d5ad],
  .about-page .c-brief .-w .-r[data-v-5662d5ad] {
    display: none !important;
  }

  /* Background Map: ensure low opacity texture behind story */
  .about-page .c-brief .figure-map[data-v-5662d5ad] {
    opacity: 0.15 !important;
    pointer-events: none !important;
    z-index: 1 !important;
  }

  /* 4. Operates / Philosophy Section */
  .about-page .c-operates[data-v-e3b67d9c] {
    padding: clamp(2.5rem, 6vw, 4rem) 0 !important;
  }
  .about-page .c-operates .-w .subtitle[data-v-e3b67d9c] {
    font-size: clamp(1.4rem, 4.5vw, 1.85rem) !important;
    text-align: center !important;
    margin: 0 auto !important;
  }
}
`;

// 1. Update public/_nuxt/about.5756c083.css
const cssFile = 'public/_nuxt/about.5756c083.css';
if (fs.existsSync(cssFile)) {
  let css = fs.readFileSync(cssFile, 'utf8');
  if (css.includes('Shreeyog About Page Responsive Mobile Layout')) {
    const start = css.indexOf('/* =========================================================\n   Shreeyog About Page Responsive Mobile Layout');
    css = css.slice(0, start) + aboutMobileCss;
  } else {
    css += '\n' + aboutMobileCss;
  }
  fs.writeFileSync(cssFile, css, 'utf8');
  console.log(`Updated ${cssFile}`);
}

// 2. Update public/about/index.html
const htmlFile = 'public/about/index.html';
if (fs.existsSync(htmlFile)) {
  let html = fs.readFileSync(htmlFile, 'utf8');
  const styleTag = `<style id="shreeyog-about-mobile-custom">${aboutMobileCss}</style>`;
  if (html.includes('id="shreeyog-about-mobile-custom"')) {
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
  const styleTag = `<style id="shreeyog-about-mobile-custom">${aboutMobileCss}</style>`;
  if (html.includes('id="shreeyog-about-mobile-custom"')) {
    const start = html.indexOf('<style id="shreeyog-about-mobile-custom">');
    const end = html.indexOf('</style>', start) + 8;
    html = html.slice(0, start) + styleTag + html.slice(end);
  } else {
    html = html.replace('</head>', `${styleTag}\n</head>`);
  }
  fs.writeFileSync(pageFile, html, 'utf8');
  console.log(`Updated ${pageFile}`);
}

console.log('--- About Page Mobile Updates Complete ---');
