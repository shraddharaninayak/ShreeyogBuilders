const fs = require('fs');
const path = require('path');

const newFooterCss = `/* --- Shreeyog Restored Footer Structure & Alignment --- */
footer .-w.block .credits[data-v-a41b36d1] {
  display: none !important;
}

/* Base / Mobile Grid (< 1024px) */
@media (max-width: 1023px) {
  footer.page-footer[data-v-a41b36d1] {
    padding-top: clamp(2.5rem, 5vw, 3.5rem) !important;
    padding-bottom: 0 !important;
    min-height: auto !important;
  }

  footer .-w.after[data-v-a41b36d1] {
    display: flex !important;
    flex-direction: column !important;
    align-items: flex-start !important;
    padding-top: clamp(1.75rem, 4vw, 2.5rem) !important;
    padding-bottom: 0 !important;
    position: relative !important;
    box-sizing: border-box !important;
    margin: 0 var(--g-margin) !important;
    width: auto !important;
    max-width: calc(100% - var(--g-margin) * 2) !important;
  }

  footer .-w.after a.-nl[data-v-a41b36d1] {
    --top: 1 !important;
    --left: 1 !important;
    --width: 6 !important;
    display: flex !important;
    align-items: flex-start !important;
    justify-content: flex-start !important;
    pointer-events: all !important;
    margin-top: 0 !important;
    margin-bottom: 1.5rem !important;
    width: auto !important;
  }

  .footer-shreeyog-brand-logo[data-v-a41b36d1] {
    width: clamp(145px, 42vw, 185px) !important;
    height: auto !important;
    max-width: 100% !important;
    object-fit: contain !important;
    display: block !important;
    filter: brightness(1.18) contrast(1.12) drop-shadow(0 2px 8px rgba(0, 0, 0, 0.6)) !important;
    transition: opacity 0.3s ease !important;
  }

  footer .-w.after .ip-1[data-v-a41b36d1] {
    --top: 2 !important;
    --left: 1 !important;
    --width: 6 !important;
    margin-top: 0 !important;
    margin-bottom: 1.5rem !important;
    display: flex !important;
    flex-direction: column !important;
    align-items: flex-start !important;
    text-align: left !important;
    width: 100% !important;
  }

  .footer-shreeyog-title[data-v-a41b36d1] {
    font-family: var(--font-t-1), "OTJubilee-Platinum", Georgia, serif !important;
    font-size: clamp(1.45rem, 4.5vw, 1.85rem) !important;
    font-weight: 400 !important;
    color: #f1eade !important;
    line-height: 1.15 !important;
    letter-spacing: -0.01em !important;
    margin: 0 0 0.35rem 0 !important;
    display: block !important;
  }

  .footer-shreeyog-sub[data-v-a41b36d1] {
    font-family: var(--font-b-medium), "Switzer-Medium", -apple-system, sans-serif !important;
    font-size: clamp(0.7rem, 2.2vw, 0.82rem) !important;
    font-weight: 500 !important;
    letter-spacing: 0.16em !important;
    text-transform: uppercase !important;
    color: #c49a6c !important;
    margin: 0 0 0.85rem 0 !important;
    display: block !important;
    white-space: normal !important;
  }

  .footer-shreeyog-desc[data-v-a41b36d1] {
    font-family: var(--font-b-regular), "Switzer-Regular", -apple-system, sans-serif !important;
    font-size: clamp(0.92rem, 2.8vw, 1.05rem) !important;
    line-height: 1.55 !important;
    color: rgba(241, 234, 222, 0.78) !important;
    margin: 0 !important;
    max-width: 100% !important;
  }

  footer .-w.after .ip-2[data-v-a41b36d1] {
    --top: 3 !important;
    --left: 1 !important;
    --width: 6 !important;
    margin-top: 0 !important;
    margin-bottom: 1.75rem !important;
    font-family: var(--font-b-regular), "Switzer-Regular", -apple-system, sans-serif !important;
    font-size: clamp(0.88rem, 2.7vw, 1.0rem) !important;
    line-height: 1.65 !important;
    color: rgba(241, 234, 222, 0.72) !important;
    width: 100% !important;
    max-width: 100% !important;
  }

  footer .stone-3[data-v-a41b36d1] {
    position: relative !important;
    transform: none !important;
    bottom: auto !important;
    right: auto !important;
    left: auto !important;
    top: auto !important;
    margin: 0 var(--g-margin) clamp(2.5rem, 6vw, 3.5rem) var(--g-margin) !important;
    width: clamp(160px, 48vw, 220px) !important;
    max-width: calc(100% - var(--g-margin) * 2) !important;
    aspect-ratio: 400 / 560 !important;
    height: auto !important;
    border-radius: 12px !important;
    overflow: hidden !important;
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.8), 0 2px 10px rgba(0, 0, 0, 0.5) !important;
    border: 1px solid rgba(241, 234, 222, 0.16) !important;
    display: block !important;
    z-index: 20 !important;
  }
  footer .stone-3[data-v-a41b36d1] img {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover !important;
    object-position: center !important;
    display: block !important;
    border-radius: 11px !important;
    filter: brightness(1.04) contrast(1.04) !important;
  }
}

/* Base Fallbacks */
.footer-shreeyog-brand-logo[data-v-a41b36d1]:hover {
  opacity: 0.9 !important;
}

/* Desktop Grid (12 columns) */
@media (min-width: 1024px) {
  footer .-w.after[data-v-a41b36d1] {
    align-items: flex-start !important;
    padding-top: var(--h1) !important;
    padding-bottom: calc(var(--p) * 2) !important;
  }
  
  footer .-w.after a.-nl[data-v-a41b36d1] {
    --top: 1 !important;
    --left: 1 !important;
    --width: 2 !important;
    margin-top: 0 !important;
    margin-bottom: 0 !important;
  }
  
  footer .-w.after .ip-1[data-v-a41b36d1] {
    --top: 1 !important;
    --left: 4 !important;
    --width: 3 !important;
    margin-top: 0 !important;
    margin-bottom: 0 !important;
  }
  
  footer .-w.after .ip-2[data-v-a41b36d1] {
    --top: 1 !important;
    --left: 8 !important;
    --width: 3 !important;
    margin-top: 0 !important;
    margin-bottom: 0 !important;
  }
  
  footer .stone-3[data-v-a41b36d1] {
    position: absolute !important;
    bottom: calc(var(--p) * 1.5) !important;
    right: var(--g-margin) !important;
    margin: 0 !important;
    width: clamp(140px, 11vw, 175px) !important;
    max-width: calc(var(--col) * 2 + var(--g-gap)) !important;
    transform: translate3d(0, calc(var(--vh, 1vh)*-8*var(--progress)), 0) !important;
    border-radius: 8px !important;
    overflow: hidden !important;
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.7) !important;
    border: 1px solid rgba(241, 234, 222, 0.12) !important;
    z-index: 50 !important;
  }
  footer .stone-3[data-v-a41b36d1] img {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover !important;
    display: block !important;
    border-radius: 8px !important;
  }
}`;

const targetHeader = '/* --- Shreeyog Restored Footer Structure & Alignment --- */';
const nextHeader = '/* --- 4-Item Footer Navigation Rules --- */';

// 1. Update public/_nuxt/MainFooter.8675ce94.css
const mfPath = 'public/_nuxt/MainFooter.8675ce94.css';
if (fs.existsSync(mfPath)) {
  let css = fs.readFileSync(mfPath, 'utf8');
  const start = css.indexOf(targetHeader);
  const end = css.indexOf(nextHeader);
  if (start !== -1 && end !== -1) {
    css = css.slice(0, start) + newFooterCss + '\n\n' + css.slice(end);
    fs.writeFileSync(mfPath, css, 'utf8');
    console.log(`Updated ${mfPath}`);
  } else {
    console.warn(`Could not locate boundaries in ${mfPath}`);
  }
}

// 2. Update files that have the inline block
const filesToUpdate = [
  'public/about/index.html',
  'public/contact/index.html',
  'public/imagine-possible-policy/index.html',
  'pages/about.html',
  'pages/contact.html',
  'pages/index.html'
];

for (const file of filesToUpdate) {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    const start = content.indexOf(targetHeader);
    const end = content.indexOf(nextHeader);
    if (start !== -1 && end !== -1) {
      content = content.slice(0, start) + newFooterCss + '\n\n' + content.slice(end);
      fs.writeFileSync(file, content, 'utf8');
      console.log(`Updated ${file}`);
    } else {
      console.warn(`Could not locate boundaries in ${file}`);
    }
  }
}

console.log('Mobile footer update complete.');
