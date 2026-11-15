const fs = require('fs');
const path = require('path');

const publicHtmlPath = 'public/index.html';
const pagesHtmlPath = 'pages/index.html';
const indexCssPath = 'public/_nuxt/index.a596e4a8.css';

console.log('--- Applying Comprehensive Homepage Flow & Animation Restoration ---');

// 1. Prepare CSS Rules
const comprehensiveCss = `
/* ==========================================================================
   SHREEYOG THE ART OF LIVING - ANIMATED BUILDING CARDS & VISUAL FLOW
   ========================================================================== */

/* 1. Ensure building card images are always rendered, visible, and contain-fit */
.c-objects .-w .sequence .object-wrapper figure,
.c-objects .-w .sequence .object-wrapper .object-holder figure,
.c-objects .-w .sequence.-sequence-cards .object-wrapper figure,
.c-objects .-w .sequence.-sequence-cards .object-wrapper .object-holder figure {
  opacity: 1 !important;
  visibility: visible !important;
  border-radius: 0.4rem !important;
  overflow: hidden !important;
  display: block !important;
  background-color: transparent !important;
  aspect-ratio: 1200 / 1600 !important;
}

.c-objects .-w .sequence .object-wrapper figure img,
.c-objects .-w .sequence .object-wrapper .object-holder figure img {
  width: 100% !important;
  height: 100% !important;
  object-fit: contain !important;
  display: block !important;
  opacity: 1 !important;
  visibility: visible !important;
  filter: drop-shadow(0 15px 35px rgba(0, 0, 0, 0.45));
}

/* 2. Shuffling sequence cards: 3D perspective stack during sticky-container-2 */
.c-objects .-w .sequence.-sequence-cards .object-wrapper {
  opacity: 1 !important;
  visibility: visible !important;
  scale: calc(1 - abs(var(--sequence-order, 0))/8) !important;
  transform: translateZ(0) scale(1) !important;
  translate: 0 calc(var(--sequence-order, 0) * var(--vh, 1vh) * 12) !important;
  z-index: calc(20 - abs(var(--sequence-order, 0))) !important;
  transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.4s ease !important;
}

/* 3. Headlines and narrative in sticky-container-2: ALWAYS visible and readable */
.c-objects .-w .sticky-container-2 .sticky,
.c-objects .-w .sticky-container-2:not(.-inview) .sticky {
  visibility: visible !important;
  opacity: 1 !important;
}

.c-objects .-w .sticky-container-2 .sticky .tt-1,
.c-objects .-w .sticky-container-2 .sticky .tt-2,
.c-objects .-w .sticky-container-2 .sticky .tt-3,
.c-objects .-w .sticky-container-2 .sticky .button-wrap,
.c-objects .-w .sticky-container-2 .sticky .sequesnce-nav {
  display: flex !important;
  visibility: visible !important;
  opacity: 1 !important;
}

/* Responsive adjustment for sticky container height: eliminate dead empty scrolling */
.c-objects .-w .sticky-container-2 {
  height: calc(var(--vh, 1vh) * 320) !important;
}

@media (max-width: 1024px) {
  .c-objects .-w .sticky-container-2 {
    height: calc(var(--vh, 1vh) * 220) !important;
  }
  .c-objects .-w .sequence {
    --width: 12 !important;
  }
  .c-objects .-w .sequence .object-wrapper {
    --left: 2 !important;
    --width: 8 !important;
    justify-self: center !important;
  }
  .c-objects .-w .sticky-container-2 .sticky .tt-1 {
    --top: 1 !important;
    --width: 10 !important;
    font-size: 1.1rem !important;
  }
  .c-objects .-w .sticky-container-2 .sticky .tt-2 {
    --top: 2 !important;
    --width: 10 !important;
    font-size: 0.95rem !important;
  }
  .c-objects .-w .sticky-container-2 .sticky .tt-3 {
    --top: 3 !important;
    --width: 10 !important;
    font-size: 0.85rem !important;
  }
  .c-objects .-w .sticky-container-2 .sticky .button-wrap {
    --top: 5 !important;
    --left: 2 !important;
    --width: 8 !important;
    justify-content: center !important;
  }
}

/* 4. Connection Section (Living room interior & philosophy card) */
.connection-figure .-w figure,
.connection-figure .-w figure img {
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
  display: block !important;
  opacity: 1 !important;
  visibility: visible !important;
}
`;

// Append CSS to public/_nuxt/index.a596e4a8.css
if (fs.existsSync(indexCssPath)) {
  let indexCss = fs.readFileSync(indexCssPath, 'utf8');
  if (!indexCss.includes('SHREEYOG THE ART OF LIVING - ANIMATED BUILDING CARDS')) {
    indexCss += '\n' + comprehensiveCss;
    fs.writeFileSync(indexCssPath, indexCss, 'utf8');
    console.log('Appended comprehensive CSS to', indexCssPath);
  } else {
    console.log('CSS already in', indexCssPath);
  }
}

// 2. Prepare Inline Script for Client-Side Guardian
const clientGuardianScript = `
<style id="shreeyog-homepage-flow-css">
${comprehensiveCss}
</style>
<script id="shreeyog-homepage-guardian">
(function() {
  const buildingImages = [
    { src: '/images/objects-init/object-4.webp', alt: 'Tanvi Residency — Shreeyog Builders' },
    { src: '/images/objects-init/object-1.webp', alt: 'Aerial Community View — Shreeyog Builders' },
    { src: '/images/objects-init/object-2.webp', alt: 'Modern Luxury Residences — Shreeyog Builders' },
    { src: '/images/objects-init/object-3.webp', alt: 'Contemporary Avenue — Shreeyog Builders' }
  ];

  function ensureBuildingCards() {
    const holders = document.querySelectorAll('.c-objects .object-holder');
    holders.forEach((holder, idx) => {
      let fig = holder.querySelector('figure');
      if (!fig) {
        fig = document.createElement('figure');
        fig.className = 'shreeyog-building-card';
        holder.appendChild(fig);
      }
      let img = fig.querySelector('img');
      const bData = buildingImages[idx] || buildingImages[0];
      if (!img || img.getAttribute('src') !== bData.src) {
        fig.innerHTML = '<img src="' + bData.src + '" alt="' + bData.alt + '" loading="eager" style="width:100%;height:100%;object-fit:contain;display:block;opacity:1;" />';
      }
      fig.style.opacity = '1';
      fig.style.visibility = 'visible';
    });

    // Ensure connection figure has living room image
    const connFig = document.querySelector('.connection-figure figure');
    if (connFig && (!connFig.querySelector('img') || !connFig.querySelector('img').src.includes('living-room'))) {
      connFig.innerHTML = '<img src="/images/shreeyog/interiors/living-room.webp" alt="Shreeyog Residential Interior" loading="eager" style="width:100%;height:100%;object-fit:cover;display:block;opacity:1;" />';
      connFig.style.opacity = '1';
      connFig.style.visibility = 'visible';
    }
  }

  // Run on load and after short intervals to ensure Vue hydration preserves them
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ensureBuildingCards);
  } else {
    ensureBuildingCards();
  }
  window.addEventListener('load', ensureBuildingCards);
  setTimeout(ensureBuildingCards, 200);
  setTimeout(ensureBuildingCards, 800);
  setTimeout(ensureBuildingCards, 1800);

  // Watch for mutations in .c-objects
  const observer = new MutationObserver(function() {
    const imgs = document.querySelectorAll('.c-objects .object-holder figure img');
    if (imgs.length < 4) {
      ensureBuildingCards();
    }
  });

  window.addEventListener('DOMContentLoaded', function() {
    const target = document.querySelector('.c-objects');
    if (target) {
      observer.observe(target, { childList: true, subtree: true });
    }
  });
})();
</script>
`;

// 3. Update public/index.html and pages/index.html
[publicHtmlPath, pagesHtmlPath].forEach(filePath => {
  if (!fs.existsSync(filePath)) return;
  let html = fs.readFileSync(filePath, 'utf8');

  // Ensure building card markup in static HTML has exact img tags
  // Replace the 4 object-holders in c-objects
  const cardMarkup0 = `<div class="object-holder" string-copy-from="connection-figure" data-v-99613b87><figure class="" data-v-99613b87 data-v-ec47b9e2><img src="/images/objects-init/object-4.webp" string="lazy" string-lazy="/images/objects-init/object-4.webp" alt="Tanvi Residency - Shreeyog Builders & Land Developers" loading="eager" data-v-ec47b9e2></figure></div>`;
  const cardMarkup1 = `<div class="object-holder" string-copy-from="connection-figure" data-v-99613b87><figure class="" data-v-99613b87 data-v-ec47b9e2><img src="/images/objects-init/object-1.webp" string="lazy" string-lazy="/images/objects-init/object-1.webp" alt="Aerial Community View - Shreeyog Builders & Land Developers" loading="eager" data-v-ec47b9e2></figure></div>`;
  const cardMarkup2 = `<div class="object-holder" string-copy-from="connection-figure" data-v-99613b87><figure class="" data-v-99613b87 data-v-ec47b9e2><img src="/images/objects-init/object-2.webp" string="lazy" string-lazy="/images/objects-init/object-2.webp" alt="Modern Luxury Residences - Shreeyog Builders & Land Developers" loading="eager" data-v-ec47b9e2></figure></div>`;
  const cardMarkup3 = `<div class="object-holder" string-copy-from="connection-figure" data-v-99613b87><figure class="" data-v-99613b87 data-v-ec47b9e2><img src="/images/objects-init/object-3.webp" string="lazy" string-lazy="/images/objects-init/object-3.webp" alt="Contemporary Avenue - Shreeyog Builders & Land Developers" loading="eager" data-v-ec47b9e2></figure></div>`;

  // Update connection-figure markup in static HTML
  const connFigOld = /<div class="connection-figure"[\s\S]*?<figure class="-fit"[\s\S]*?<\/figure>/;
  const connFigNew = `<div class="connection-figure" string="progress" string-key="--connection-progress" string-self-disable string-id="connection-figure" string-exit-el="top" string-offset-top="0%" string-easing="cubic-bezier(0.5,.5,0.4,0.8)" data-v-f3038ea5><div class="-w" data-header-color="light" string string-repeat string-id="connection-bg" string-enter-vp="top" data-v-f3038ea5><figure class="-fit" string="progress" data-v-f3038ea5 data-v-ec47b9e2><img src="/images/shreeyog/interiors/living-room.webp" string="lazy" string-lazy="/images/shreeyog/interiors/living-room.webp" alt="Shreeyog Residential Interior" loading="eager" data-v-ec47b9e2></figure>`;

  html = html.replace(connFigOld, connFigNew);

  // Inject guardian script before </body>
  if (html.includes('id="shreeyog-homepage-guardian"')) {
    html = html.replace(/<style id="shreeyog-homepage-flow-css">[\s\S]*?<\/script>/, clientGuardianScript);
  } else {
    html = html.replace('</body>', clientGuardianScript + '\n</body>');
  }

  fs.writeFileSync(filePath, html, 'utf8');
  console.log('Successfully updated', filePath);
});

console.log('--- Homepage Flow Restoration Complete ---');
