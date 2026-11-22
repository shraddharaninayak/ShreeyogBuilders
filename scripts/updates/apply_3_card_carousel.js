const fs = require('fs');
const path = require('path');

console.log('=== Applying 3-Card Carousel for Shree Bramhand, Shree Vishwa, Shree Samruddhi Park ===');

// The 3 exact cards in strict serial order:
// 1. Shree Bramhand
// 2. Shree Vishwa
// 3. Shree Samruddhi Park
const threeCards = [
  {
    name: 'Shree Bramhand',
    src: '/images/objects-init/shree-bramhand.webp',
    alt: 'Shree Bramhand - Shreeyog Builders & Land Developers',
    href: '/projects/shree-bramhand/brochure',
    logo: '/images/shreeyog/logos/shree-bramhand-logo-transparent.png'
  },
  {
    name: 'Shree Vishwa',
    src: '/images/objects-init/shree-vishwa.webp',
    alt: 'Shree Vishwa - Shreeyog Builders & Land Developers',
    href: '/projects/shree-vishwa/brochure',
    logo: '/images/shreeyog/logos/shree-vishwa-logo.png'
  },
  {
    name: 'Shree Samruddhi Park',
    src: '/images/objects-init/shree-samruddhi-park.webp',
    alt: 'Shree Samruddhi Park - Shreeyog Builders & Land Developers',
    href: '/projects/shree-samruddhi-park/brochure',
    logo: '/images/shreeyog/logos/shree-samruddhi-park-logo.png'
  }
];

function buildCardHtml(card) {
  const logoHtml = card.logo
    ? `\n            <div class="shreeyog-card-top"><img src="${card.logo}" alt="${card.name} Logo" class="shreeyog-card-logo" loading="lazy" /></div>`
    : '';

  return `          <a href="${card.href}" data-project-href="${card.href}" class="shreeyog-building-card" aria-label="${card.name}">
            <figure class="shreeyog-building-figure">
              <img src="${card.src}" alt="${card.alt}" loading="eager" width="1200" height="1600" />
            </figure>${logoHtml}
            <div class="shreeyog-card-footer">
              <span class="shreeyog-card-name">${card.name}</span>
            </div>
          </a>`;
}

// Repeat the 3 cards twice (6 cards total per group) for seamless continuous looping
function buildGroupHtml() {
  const cards = [];
  for (let r = 0; r < 2; r++) {
    for (const c of threeCards) {
      cards.push(buildCardHtml(c));
    }
  }
  return cards.join('\n');
}

const groupCardsHtml = buildGroupHtml();

// CSS rules for cards, overlays, and links
const carouselCss = `
/* ==========================================================================
   SHREEYOG 3-PROJECT CAROUSEL (BRAMHAND, VISHWA, SAMRUDDHI PARK)
   ========================================================================== */
a.shreeyog-building-card,
.shreeyog-building-card {
  position: relative !important;
  overflow: hidden !important;
  display: block !important;
  text-decoration: none !important;
  color: inherit !important;
  cursor: pointer !important;
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

function updateHtmlFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  console.log('Updating:', filePath);
  let html = fs.readFileSync(filePath, 'utf8');

  // Replace / Add CSS
  if (html.includes('SHREEYOG 3-PROJECT CAROUSEL')) {
    html = html.replace(/\/\* ==========================================================================\s*SHREEYOG 3-PROJECT CAROUSEL[\s\S]*?@media \(max-width: 768px\) \{[\s\S]*?\}\s*\}/, carouselCss.trim());
  } else if (html.includes('SHREEYOG BUILDING CAROUSEL CARD OVERLAYS')) {
    html = html.replace(/\/\* ==========================================================================\s*SHREEYOG BUILDING CAROUSEL CARD OVERLAYS[\s\S]*?@media \(max-width: 768px\) \{[\s\S]*?\}\s*\}/, carouselCss.trim());
  } else {
    html = html.replace('</style>', `${carouselCss}\n</style>`);
  }

  // Replace static marquee groups
  const marqueeGroupRegex = /<div class="shreeyog-marquee-group" aria-hidden="false">[\s\S]*?<\/div>\s*<div class="shreeyog-marquee-group" aria-hidden="true">[\s\S]*?<\/div>/;
  const newMarqueeGroups = `<div class="shreeyog-marquee-group" aria-hidden="false">\n${groupCardsHtml}\n          </div>\n          <div class="shreeyog-marquee-group" aria-hidden="true">\n${groupCardsHtml}\n          </div>`;
  
  if (marqueeGroupRegex.test(html)) {
    html = html.replace(marqueeGroupRegex, newMarqueeGroups);
    console.log('Replaced static marquee groups in', filePath);
  }

  // Update window.__SHREEYOG_ART_HTML__
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
    console.log('Updated window.__SHREEYOG_ART_HTML__ in', filePath);
  }

  // Add click handler for cards if not already attached
  if (!html.includes('shreeyogCardClickHandlerAttached')) {
    const clickHandlerCode = `
      // Handle project card clicks inside the carousel
      if (!window.__shreeyogCardClickHandlerAttached) {
        window.__shreeyogCardClickHandlerAttached = true;
        document.addEventListener('click', function(e) {
          const card = e.target.closest('.shreeyog-building-card');
          if (card && card.closest('.shreeyog-marquee-track')) {
            const href = card.getAttribute('href') || card.getAttribute('data-project-href');
            if (href) {
              e.preventDefault();
              window.location.href = href;
            }
          }
        });
      }
`;
    html = html.replace('function initProjectsTarget() {', `${clickHandlerCode}\n      function initProjectsTarget() {`);
    console.log('Added card click handler in script of', filePath);
  }

  fs.writeFileSync(filePath, html, 'utf8');
}

updateHtmlFile('d:/INTERNSHIPS/SOCIAL MEDIA MANANGMENT[SKILLNEX]/WEBSITES/Shreeyogweb/public/index.html');
updateHtmlFile('d:/INTERNSHIPS/SOCIAL MEDIA MANANGMENT[SKILLNEX]/WEBSITES/Shreeyogweb/pages/index.html');

// Also update Nuxt chunk CSS
const nuxtCssPath = 'd:/INTERNSHIPS/SOCIAL MEDIA MANANGMENT[SKILLNEX]/WEBSITES/Shreeyogweb/public/_nuxt/index.a596e4a8.css';
if (fs.existsSync(nuxtCssPath)) {
  let css = fs.readFileSync(nuxtCssPath, 'utf8');
  if (css.includes('SHREEYOG 3-PROJECT CAROUSEL')) {
    css = css.replace(/\/\* ==========================================================================\s*SHREEYOG 3-PROJECT CAROUSEL[\s\S]*?@media \(max-width: 768px\) \{[\s\S]*?\}\s*\}/, carouselCss.trim());
  } else if (css.includes('SHREEYOG BUILDING CAROUSEL CARD OVERLAYS')) {
    css = css.replace(/\/\* ==========================================================================\s*SHREEYOG BUILDING CAROUSEL CARD OVERLAYS[\s\S]*?@media \(max-width: 768px\) \{[\s\S]*?\}\s*\}/, carouselCss.trim());
  } else {
    css += `\n${carouselCss}\n`;
  }
  fs.writeFileSync(nuxtCssPath, css, 'utf8');
  console.log('Updated Nuxt chunk CSS');
}

console.log('=== Finished applying 3-card carousel (Shree Bramhand, Shree Vishwa, Shree Samruddhi Park) ===');
