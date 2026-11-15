const fs = require('fs');

const htmlPath = 'D:/Shreeyogweb/obsidianassembly.com/index.html';
let html = fs.readFileSync(htmlPath, 'utf8');

// Custom CSS for Shreeyog Hero Headline
const headlineCustomCss = `
<style id="shreeyog-hero-custom">
.c-welcome .-w .stone[data-v-6c6a6d99] {
  -webkit-mask-image: none !important;
  mask-image: none !important;
  background-color: transparent !important;
}
.c-welcome .-w .stone .hover-1[data-v-6c6a6d99],
.c-welcome .-w .stone .hover-2[data-v-6c6a6d99] {
  display: none !important;
}
.shreeyog-brand-logo {
  height: 78px;
  width: auto;
  max-width: 240px;
  object-fit: contain;
  display: block;
  margin-top: -2px;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.45));
  transition: transform 0.3s ease, filter 0.3s ease;
}
.shreeyog-brand-logo:hover {
  transform: scale(1.02);
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.55));
}
@media (max-width: 1024px) {
  .shreeyog-brand-logo {
    height: 56px;
    max-width: 180px;
  }
}
@media (max-width: 768px) {
  .shreeyog-brand-logo {
    height: 48px;
    max-width: 150px;
  }
}

/* =========================================================
   HERO HEADLINE: TYPOGRAPHY, ONE-LINE "Beyond Spaces," & CENTERING
   ========================================================= */

/* Prevent ANY wrapping or letter-break across all screen sizes */
.c-welcome .-w span.title[data-v-6c6a6d99],
.c-welcome .-w span.title[data-v-6c6a6d99].-splitted,
.c-welcome .-w span.title[data-v-6c6a6d99] * {
  white-space: nowrap !important;
  flex-wrap: nowrap !important;
  word-break: keep-all !important;
  overflow-wrap: normal !important;
}

/* Line 1: "Beyond Spaces," - single horizontal line, perfectly centered */
.c-welcome .-w span.line-1[data-v-6c6a6d99] {
  --left: 1 !important;
  --width: 6 !important;
  grid-column: 1 / -1 !important;
  justify-self: center !important;
  text-align: center !important;
  font-size: clamp(48px, 9.2vw, 132px) !important;
  line-height: 0.88 !important;
  letter-spacing: -0.015em !important;
  max-width: 100% !important;
  margin: 0 auto !important;
  padding: 0 !important;
  -webkit-mask-image: none !important;
  mask-image: none !important;
}

/* Line 2: "We Build" - centered, balanced editorial scale */
.c-welcome .-w span.line-2[data-v-6c6a6d99] {
  --left: 1 !important;
  --width: 6 !important;
  grid-column: 1 / -1 !important;
  justify-self: center !important;
  justify-content: center !important;
  text-align: center !important;
  font-size: clamp(54px, 10.5vw, 150px) !important;
  line-height: 0.88 !important;
  letter-spacing: -0.01em !important;
  margin: 0 auto !important;
}

/* Line 3: "Legacies." - centered over architectural visual */
.c-welcome .-w span.line-3[data-v-6c6a6d99] {
  --left: 1 !important;
  --width: 6 !important;
  grid-column: 1 / -1 !important;
  justify-self: center !important;
  text-align: center !important;
  font-size: clamp(58px, 11vw, 160px) !important;
  line-height: 0.88 !important;
  letter-spacing: -0.01em !important;
  margin: 0 auto !important;
  z-index: 20 !important;
}

/* Editorial Subtitles positioning */
.c-welcome .-w .line-1-m[data-v-6c6a6d99] {
  --left: 5 !important;
  --width: 2 !important;
  grid-column: 5 / 7 !important;
  justify-self: end !important;
  text-align: right !important;
  margin-top: calc(var(--large) * -0.6) !important;
  padding-right: var(--g-gap) !important;
  z-index: 15 !important;
}

.c-welcome .-w .line-2-m[data-v-6c6a6d99] {
  --left: 1 !important;
  --width: 2 !important;
  grid-column: 1 / 3 !important;
  justify-self: start !important;
  text-align: left !important;
  padding-left: var(--g-gap) !important;
  z-index: 15 !important;
}

/* Responsive adjustments for tablet and mobile */
@media (max-width: 1024px) {
  .c-welcome .-w span.line-1[data-v-6c6a6d99] {
    font-size: clamp(38px, 8.5vw, 84px) !important;
  }
  .c-welcome .-w span.line-2[data-v-6c6a6d99] {
    font-size: clamp(42px, 9.5vw, 96px) !important;
  }
  .c-welcome .-w span.line-3[data-v-6c6a6d99] {
    font-size: clamp(46px, 10vw, 104px) !important;
  }
  .c-welcome .-w .line-1-m[data-v-6c6a6d99],
  .c-welcome .-w .line-2-m[data-v-6c6a6d99] {
    font-size: 9px !important;
  }
}

@media (max-width: 768px) {
  .c-welcome .-w span.line-1[data-v-6c6a6d99] {
    font-size: clamp(28px, 8vw, 48px) !important;
  }
  .c-welcome .-w span.line-2[data-v-6c6a6d99] {
    font-size: clamp(32px, 9vw, 56px) !important;
  }
  .c-welcome .-w span.line-3[data-v-6c6a6d99] {
    font-size: clamp(36px, 10vw, 64px) !important;
  }
}
</style>
`;

// Replace existing <style id="shreeyog-hero-custom">...</style>
const startIdx = html.indexOf('<style id="shreeyog-hero-custom">');
const endIdx = html.indexOf('</style>', startIdx);

if (startIdx !== -1 && endIdx !== -1) {
  html = html.substring(0, startIdx) + headlineCustomCss.trim() + html.substring(endIdx + 8);
  fs.writeFileSync(htmlPath, html, 'utf8');
  console.log('Successfully updated shreeyog-hero-custom style block in index.html');
} else {
  console.log('Error: <style id="shreeyog-hero-custom"> not found');
}
