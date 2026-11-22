const fs = require('fs');
const path = require('path');

console.log('=== Updating Homepage Building Carousel Cards with Project Names & Logos ===');

// The 4 distinct building cards in the marquee sequence
const cardsData = [
  {
    name: 'Tanvi Residency',
    src: '/images/objects-init/object-4.webp',
    alt: 'Tanvi Residency - Shreeyog Builders & Land Developers',
    logo: null
  },
  {
    name: 'Shree Pandurang',
    src: '/images/objects-init/object-1.webp',
    alt: 'Shree Pandurang - Shreeyog Builders & Land Developers',
    logo: null
  },
  {
    name: 'Shree Anant',
    src: '/images/objects-init/object-2.webp',
    alt: 'Shree Anant - Shreeyog Builders & Land Developers',
    logo: null
  },
  {
    name: 'Shree Nath Enclave',
    src: '/images/objects-init/object-3.webp',
    alt: 'Shree Nath Enclave - Shreeyog Builders & Land Developers',
    logo: null
  }
];

function buildSingleCardHtml(card) {
  const logoHtml = card.logo
    ? `\n            <div class="shreeyog-card-top"><img src="${card.logo}" alt="${card.name} Logo" class="shreeyog-card-logo" loading="lazy" /></div>`
    : '';

  return `          <div class="shreeyog-building-card">
            <figure class="shreeyog-building-figure">
              <img src="${card.src}" alt="${card.alt}" loading="eager" width="1200" height="1600" />
            </figure>${logoHtml}
            <div class="shreeyog-card-footer">
              <span class="shreeyog-card-name">${card.name}</span>
            </div>
          </div>`;
}

// Generate the 8 cards per group (sequence of 4 repeated twice for seamless loop)
function buildGroupCardsHtml() {
  let cards = [];
  for (let r = 0; r < 2; r++) {
    for (const c of cardsData) {
      cards.push(buildSingleCardHtml(c));
    }
  }
  return cards.join('\n');
}

const groupCardsHtml = buildGroupCardsHtml();

// CSS for card top badge, card footer, and card typography
const cardOverlayCss = `
/* ==========================================================================
   SHREEYOG BUILDING CAROUSEL CARD OVERLAYS (NAME & OFFICIAL LOGO)
   ========================================================================== */
.shreeyog-building-card {
  position: relative !important;
  overflow: hidden !important;
}

.shreeyog-card-top {
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  padding: clamp(0.75rem, 1.1vw, 1rem) clamp(0.85rem, 1.2vw, 1.15rem) clamp(1.2rem, 1.8vw, 1.6rem) clamp(0.85rem, 1.2vw, 1.15rem) !important;
  background: linear-gradient(180deg, rgba(15, 14, 15, 0.68) 0%, rgba(15, 14, 15, 0.25) 60%, transparent 100%) !important;
  display: flex !important;
  align-items: center !important;
  justify-content: flex-end !important;
  pointer-events: none !important;
  z-index: 4 !important;
}

.shreeyog-card-logo {
  max-height: clamp(24px, 2.2vw, 32px) !important;
  max-width: clamp(90px, 8vw, 120px) !important;
  width: auto !important;
  height: auto !important;
  object-fit: contain !important;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.85)) !important;
  pointer-events: none !important;
}

.shreeyog-card-footer {
  position: absolute !important;
  bottom: 0 !important;
  left: 0 !important;
  right: 0 !important;
  padding: clamp(1.5rem, 2.3vw, 2.2rem) clamp(0.85rem, 1.2vw, 1.15rem) clamp(0.85rem, 1.1vw, 1.05rem) clamp(0.85rem, 1.2vw, 1.15rem) !important;
  background: linear-gradient(0deg, rgba(15, 14, 15, 0.85) 0%, rgba(15, 14, 15, 0.5) 60%, transparent 100%) !important;
  display: flex !important;
  flex-direction: column !important;
  align-items: flex-start !important;
  justify-content: flex-end !important;
  pointer-events: none !important;
  z-index: 4 !important;
  text-align: left !important;
}

.shreeyog-card-name {
  font-family: var(--font-t-1), "Voyage", "OTJubilee-Platinum", Georgia, serif !important;
  font-size: clamp(0.96rem, 1.15vw, 1.16rem) !important;
  font-weight: 400 !important;
  line-height: 1.2 !important;
  letter-spacing: 0.025em !important;
  color: #f7f3ed !important;
  margin: 0 !important;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.85) !important;
  white-space: nowrap !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  max-width: 100% !important;
}

@media (max-width: 768px) {
  .shreeyog-card-footer {
    padding: 1.3rem 0.8rem 0.75rem 0.8rem !important;
  }
  .shreeyog-card-name {
    font-size: 0.95rem !important;
  }
  .shreeyog-card-logo {
    max-height: 22px !important;
    max-width: 85px !important;
  }
}
`;

// Helper to update files
function updateIndexHtml(filePath) {
  if (!fs.existsSync(filePath)) return;
  console.log('Processing:', filePath);
  let html = fs.readFileSync(filePath, 'utf8');

  // 1. Add CSS if not present
  if (!html.includes('SHREEYOG BUILDING CAROUSEL CARD OVERLAYS')) {
    html = html.replace('</style>', `${cardOverlayCss}\n</style>`);
    console.log('Added cardOverlayCss to <style>');
  }

  // 2. Replace static marquee group contents
  const marqueeGroupRegex = /<div class="shreeyog-marquee-group" aria-hidden="false">[\s\S]*?<\/div>\s*<div class="shreeyog-marquee-group" aria-hidden="true">[\s\S]*?<\/div>/;
  const newMarqueeGroups = `<div class="shreeyog-marquee-group" aria-hidden="false">\n${groupCardsHtml}\n          </div>\n          <div class="shreeyog-marquee-group" aria-hidden="true">\n${groupCardsHtml}\n          </div>`;
  
  if (marqueeGroupRegex.test(html)) {
    html = html.replace(marqueeGroupRegex, newMarqueeGroups);
    console.log('Replaced static marquee groups');
  } else {
    console.warn('Could not match static marquee groups regex in', filePath);
  }

  // 3. Update window.__SHREEYOG_ART_HTML__ in hydration script
  // Generate inner HTML string for script
  const artOfLivingInnerHtml = `
      <div class="shreeyog-art-header">
        <span class="shreeyog-art-kicker">ARCHITECTURAL CHARACTER</span>
        <h2 class="shreeyog-art-title">The Art of Living</h2>
        <p class="shreeyog-art-subtitle">DESIGNED WITH PURPOSE. BUILT WITH CARE.</p>
        <p class="shreeyog-art-desc">From the first impression to the smallest detail, every space reflects a thoughtful approach to design and living.</p>
      </div>
      <div class="shreeyog-marquee-outer" aria-label="Shreeyog Architectural Showcase">
        <div class="shreeyog-marquee-track">
          <div class="shreeyog-marquee-group" aria-hidden="false">
${groupCardsHtml}
          </div>
          <div class="shreeyog-marquee-group" aria-hidden="true">
${groupCardsHtml}
          </div>
        </div>
      </div>
      <div class="shreeyog-art-cta">
        <a href="/projects" class="shreeyog-art-btn" id="exploreProjectsBtn" aria-label="Explore Projects">
          <span class="text -mm -up">Explore Projects</span>
        </a>
      </div>
`;

  const scriptGuardRegex = /window\.__SHREEYOG_ART_HTML__\s*=\s*"[\s\S]*?";\n/;
  const serializedHtml = JSON.stringify(artOfLivingInnerHtml);
  if (scriptGuardRegex.test(html)) {
    html = html.replace(scriptGuardRegex, `window.__SHREEYOG_ART_HTML__ = ${serializedHtml};\n`);
    console.log('Updated window.__SHREEYOG_ART_HTML__');
  } else {
    console.warn('Could not match window.__SHREEYOG_ART_HTML__ regex in', filePath);
  }

  fs.writeFileSync(filePath, html, 'utf8');
  console.log('Successfully saved:', filePath);
}

// Update public/index.html
updateIndexHtml('d:/INTERNSHIPS/SOCIAL MEDIA MANANGMENT[SKILLNEX]/WEBSITES/Shreeyogweb/public/index.html');

// Update pages/index.html
updateIndexHtml('d:/INTERNSHIPS/SOCIAL MEDIA MANANGMENT[SKILLNEX]/WEBSITES/Shreeyogweb/pages/index.html');

// Also append CSS to Nuxt chunk CSS file if exists
const nuxtCssPath = 'd:/INTERNSHIPS/SOCIAL MEDIA MANANGMENT[SKILLNEX]/WEBSITES/Shreeyogweb/public/_nuxt/index.a596e4a8.css';
if (fs.existsSync(nuxtCssPath)) {
  let css = fs.readFileSync(nuxtCssPath, 'utf8');
  if (!css.includes('SHREEYOG BUILDING CAROUSEL CARD OVERLAYS')) {
    css += `\n${cardOverlayCss}\n`;
    fs.writeFileSync(nuxtCssPath, css, 'utf8');
    console.log('Appended cardOverlayCss to Nuxt chunk CSS');
  }
}

console.log('=== All updates completed successfully ===');
