const fs = require('fs');
const path = require('path');

console.log('=== Starting Complete Art of Living Implementation ===');

// 1. Prepare Cards HTML
function buildCardsHtml() {
  const cards = [
    { src: '/images/objects-init/object-4.webp', alt: 'Tanvi Residency - Shreeyog Builders & Land Developers' },
    { src: '/images/objects-init/object-1.webp', alt: 'Aerial Community View - Shreeyog Builders & Land Developers' },
    { src: '/images/objects-init/object-2.webp', alt: 'Modern Luxury Residences - Shreeyog Builders & Land Developers' },
    { src: '/images/objects-init/object-3.webp', alt: 'Contemporary Avenue - Shreeyog Builders & Land Developers' }
  ];

  let out = '';
  // Repeat twice per group (8 cards total per group)
  for (let r = 0; r < 2; r++) {
    for (const c of cards) {
      out += `
          <div class="shreeyog-building-card">
            <figure class="shreeyog-building-figure">
              <img src="${c.src}" alt="${c.alt}" loading="eager" width="1200" height="1600" />
            </figure>
          </div>`;
    }
  }
  return out;
}

const groupCards = buildCardsHtml();

// 2. Prepare Inner Section HTML
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
${groupCards}
          </div>
          <div class="shreeyog-marquee-group" aria-hidden="true">
${groupCards}
          </div>
        </div>
      </div>
      <div class="shreeyog-art-cta">
        <a href="/projects" class="shreeyog-art-btn" id="exploreProjectsBtn" aria-label="Explore Projects">
          <span class="text -mm -up">Explore Projects</span>
        </a>
      </div>
`;

// 3. Prepare CSS
const cssContent = `
/* ==========================================================================
   SHREEYOG "THE ART OF LIVING" CONTINUOUS HORIZONTAL FLOWING ANIMATION
   ========================================================================== */

/* 1. Section Container Override */
section.c-objects,
.c-objects[data-v-99613b87],
.c-objects.shreeyog-art-of-living {
  display: block !important;
  position: relative !important;
  width: 100% !important;
  min-height: auto !important;
  height: auto !important;
  background-color: #eee7dc !important;
  background-image: url(/images/home/original-objects-bg.webp) !important;
  background-position: center center !important;
  background-repeat: no-repeat !important;
  background-size: cover !important;
  color: #1a1918 !important;
  padding: clamp(5rem, 8vw, 8.5rem) 0 clamp(5.5rem, 9vw, 9rem) 0 !important;
  margin: 0 !important;
  overflow: hidden !important;
  z-index: 15 !important;
}

/* Neutralize legacy template sticky heights & old containers */
.c-objects > .-w,
.c-objects .sequence,
.c-objects .objects-butterfly-path,
.c-objects .sticky-container-1,
.c-objects .sticky-container-2,
.c-objects .sequesnce-nav {
  display: none !important;
}

/* 2. Main Container */
.shreeyog-art-container {
  width: 100% !important;
  max-width: 100% !important;
  margin: 0 auto !important;
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
  text-align: center !important;
  position: relative !important;
  z-index: 2 !important;
  visibility: visible !important;
  opacity: 1 !important;
}

/* 3. Header Typography */
.shreeyog-art-header {
  max-width: 960px !important;
  margin: 0 auto clamp(2rem, 3.5vw, 3rem) auto !important;
  padding: 0 var(--g-margin, 24px) !important;
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
  text-align: center !important;
  visibility: visible !important;
  opacity: 1 !important;
}

.shreeyog-art-kicker {
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  font-family: var(--font-b-medium), "Switzer-Medium", -apple-system, sans-serif !important;
  font-size: clamp(0.72rem, 0.88vw, 0.82rem) !important;
  font-weight: 500 !important;
  letter-spacing: 0.28em !important;
  text-transform: uppercase !important;
  color: #8c6a51 !important;
  margin-bottom: clamp(0.8rem, 1.4vw, 1.2rem) !important;
  opacity: 0.95 !important;
}

.shreeyog-art-title {
  display: block !important;
  font-family: var(--font-t-1), "OTJubilee-Platinum", Georgia, serif !important;
  font-size: clamp(2.8rem, 6vw, 6.2rem) !important;
  font-weight: 400 !important;
  line-height: 1.08 !important;
  letter-spacing: -0.025em !important;
  color: #1a1918 !important;
  margin: 0 0 clamp(0.9rem, 1.6vw, 1.4rem) 0 !important;
  visibility: visible !important;
  opacity: 1 !important;
}

.shreeyog-art-subtitle {
  display: block !important;
  font-family: var(--font-b-medium), "Switzer-Medium", -apple-system, sans-serif !important;
  font-size: clamp(0.78rem, 0.95vw, 0.92rem) !important;
  font-weight: 500 !important;
  letter-spacing: 0.18em !important;
  text-transform: uppercase !important;
  color: #4a423a !important;
  margin: 0 0 clamp(0.6rem, 1vw, 0.85rem) 0 !important;
}

.shreeyog-art-desc {
  display: block !important;
  font-family: var(--font-b-regular), "Switzer-Regular", -apple-system, sans-serif !important;
  font-size: clamp(0.95rem, 1.15vw, 1.12rem) !important;
  font-weight: 400 !important;
  line-height: 1.65 !important;
  color: #635b52 !important;
  max-width: 660px !important;
  margin: 0 auto !important;
}

/* 4. Marquee Outer Wrapper & Edge Fade Masks */
.shreeyog-marquee-outer {
  width: 100vw !important;
  max-width: 100% !important;
  overflow: hidden !important;
  position: relative !important;
  padding: clamp(1.2rem, 2.5vw, 2.2rem) 0 !important;
  margin: 0 0 clamp(2rem, 3.5vw, 3rem) 0 !important;
  -webkit-mask-image: linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%) !important;
  mask-image: linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%) !important;
}

/* 5. Marquee Track: Seamless Continuous Left-to-Right Glide */
.shreeyog-marquee-track {
  display: flex !important;
  width: max-content !important;
  animation: shreeyogFlowLeftToRight 38s linear infinite !important;
  will-change: transform !important;
}

.shreeyog-marquee-group {
  display: flex !important;
  flex-shrink: 0 !important;
  gap: clamp(18px, 2vw, 30px) !important;
  padding-right: clamp(18px, 2vw, 30px) !important;
}

/* 6. Building Image Card Design */
.shreeyog-building-card {
  width: clamp(230px, 18.5vw, 290px) !important;
  aspect-ratio: 3 / 4 !important;
  flex-shrink: 0 !important;
  border-radius: clamp(8px, 0.8vw, 12px) !important;
  overflow: hidden !important;
  background-color: #dfd7ca !important;
  border: 1px solid rgba(255, 255, 255, 0.6) !important;
  box-shadow: 0 16px 36px rgba(28, 22, 18, 0.16), 0 4px 12px rgba(28, 22, 18, 0.08) !important;
  position: relative !important;
  transition: transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.45s ease !important;
}

.shreeyog-building-card:hover {
  transform: translateY(-6px) scale(1.02) !important;
  box-shadow: 0 24px 48px rgba(28, 22, 18, 0.24), 0 6px 16px rgba(28, 22, 18, 0.12) !important;
}

.shreeyog-building-figure {
  width: 100% !important;
  height: 100% !important;
  margin: 0 !important;
  padding: 0 !important;
  display: block !important;
  position: relative !important;
}

.shreeyog-building-figure img {
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
  display: block !important;
  border-radius: inherit !important;
  user-select: none !important;
  -webkit-user-drag: none !important;
}

/* Flow Left to Right Keyframe: translateX increases from -50% to 0% */
@keyframes shreeyogFlowLeftToRight {
  0% {
    transform: translate3d(-50%, 0, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}

/* 7. Explore Projects CTA Button */
.shreeyog-art-cta {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  width: 100% !important;
  margin: clamp(1.5rem, 3vw, 2.8rem) auto 0 auto !important;
  position: relative !important;
  z-index: 10 !important;
}

.shreeyog-art-btn {
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  padding: 0.95rem 2.8rem !important;
  background-color: #1a1918 !important;
  color: #f7f3ed !important;
  border-radius: 9999px !important;
  border: 1px solid rgba(26, 25, 24, 0.8) !important;
  font-family: var(--font-b-medium), "Switzer-Medium", -apple-system, sans-serif !important;
  font-size: clamp(0.78rem, 0.92vw, 0.88rem) !important;
  font-weight: 500 !important;
  letter-spacing: 0.22em !important;
  text-transform: uppercase !important;
  text-decoration: none !important;
  cursor: pointer !important;
  box-shadow: 0 10px 24px rgba(26, 25, 24, 0.18) !important;
  transition: all 0.35s cubic-bezier(0.2, 0.8, 0.2, 1) !important;
}

.shreeyog-art-btn:hover {
  background-color: #8c6a51 !important;
  border-color: #8c6a51 !important;
  color: #ffffff !important;
  transform: translateY(-2px) !important;
  box-shadow: 0 16px 32px rgba(140, 106, 81, 0.28) !important;
}

.shreeyog-art-btn span {
  color: inherit !important;
  letter-spacing: inherit !important;
}

/* 8. Reduced Motion Accessibility */
@media (prefers-reduced-motion: reduce) {
  .shreeyog-marquee-track {
    animation: none !important;
  }
  .shreeyog-marquee-outer {
    overflow-x: auto !important;
    -webkit-overflow-scrolling: touch !important;
  }
}

/* 9. Mobile Responsiveness */
@media (max-width: 768px) {
  section.c-objects,
  .c-objects[data-v-99613b87],
  .c-objects.shreeyog-art-of-living {
    padding: 3.5rem 0 4.2rem 0 !important;
  }
  .shreeyog-building-card {
    width: 220px !important;
  }
  .shreeyog-marquee-outer {
    -webkit-mask-image: linear-gradient(to right, transparent 0%, black 3%, black 97%, transparent 100%) !important;
    mask-image: linear-gradient(to right, transparent 0%, black 3%, black 97%, transparent 100%) !important;
    margin-bottom: 1.8rem !important;
  }
}
`;

// 4. Update index.d0184b9b.js Vue Render Function
const jsPath = 'public/_nuxt/index.d0184b9b.js';
if (fs.existsSync(jsPath)) {
  let js = fs.readFileSync(jsPath, 'utf8');

  // Find Et render function:
  // (f,p)=>{const a=J,u=ve,E=ce,T=ee;return g(),h("section",{class:"c-objects",ref_key:"objectsRoot",ref:i,"data-header-color":"dark","data-header-debug":"true",string:"","string-repeat":"","string-id":"objects-section","string-enter-vp":"top"},[r(T,null,{default:q(()=>[...])})])
  const renderStart = js.indexOf('(f,p)=>{const a=J,u=ve,E=ce,T=ee;return g(),h("section",{class:"c-objects"');
  const renderEndTarget = ';const Lt=j(Et,[["__scopeId","data-v-99613b87"]])';
  const renderEnd = js.indexOf(renderEndTarget);

  if (renderStart !== -1 && renderEnd !== -1) {
    console.log('Replacing Et render function in index.d0184b9b.js...');
    const customRender = `(f,p)=>{return g(),h("section",{class:"c-objects shreeyog-art-of-living",ref_key:"objectsRoot",ref:i,"data-header-color":"dark","data-header-debug":"true","string-id":"objects-section",id:"art-of-living"},[s("div",{class:"shreeyog-art-container",innerHTML:window.__SHREEYOG_ART_HTML__||""})],512)}}});`;
    js = js.substring(0, renderStart) + customRender + js.substring(renderEnd);
    fs.writeFileSync(jsPath, js, 'utf8');
    console.log('Successfully updated index.d0184b9b.js!');
  } else {
    console.log('Warning: could not locate exact Et render function boundaries in index.d0184b9b.js');
  }
}

// 5. Update public/_nuxt/index.a596e4a8.css
const indexCssPath = 'public/_nuxt/index.a596e4a8.css';
if (fs.existsSync(indexCssPath)) {
  let css = fs.readFileSync(indexCssPath, 'utf8');
  const marker = '/* ==========================================================================\n   SHREEYOG "THE ART OF LIVING" CONTINUOUS HORIZONTAL FLOWING ANIMATION';
  const markerIdx = css.indexOf(marker);
  if (markerIdx !== -1) {
    css = css.substring(0, markerIdx) + cssContent;
  } else {
    css += '\n' + cssContent;
  }
  fs.writeFileSync(indexCssPath, css, 'utf8');
  console.log('Updated public/_nuxt/index.a596e4a8.css!');
}

// 6. Section HTML for public/index.html and pages/index.html
const completeSectionHtml = `<section class="c-objects shreeyog-art-of-living" data-header-color="dark" data-header-debug="true" string-id="objects-section" id="art-of-living">
    <div class="shreeyog-art-container">
${artOfLivingInnerHtml}
    </div>
    <script id="shreeyog-art-of-living-script">
    (function() {
      window.__SHREEYOG_ART_HTML__ = ${JSON.stringify(artOfLivingInnerHtml)};

      function initProjectsTarget() {
        const placesTarget = document.querySelector('[string-id="places"]') || document.querySelector('.c-places');
        if (placesTarget && !placesTarget.id) {
          placesTarget.id = 'places';
        }
      }
      initProjectsTarget();

      // Navigation to Shreeyog Projects page on Explore Projects button click
      document.addEventListener('click', function(e) {
        const btn = e.target.closest('#exploreProjectsBtn, .shreeyog-art-btn');
        if (btn && btn.closest('.c-objects')) {
          e.preventDefault();
          window.location.href = '/projects';
        }
      });

      // Hydration guard: ensure .shreeyog-art-container is always present and legacy wrappers hidden
      function ensureSectionIntegrity() {
        initProjectsTarget();
        const section = document.querySelector('.c-objects');
        if (!section) return;

        // Hide any legacy wrappers that Nuxt might inject
        const legacy = section.querySelectorAll('.-w:not(.shreeyog-art-container), .sequence, .sticky-container-1, .sticky-container-2, .objects-butterfly-path');
        legacy.forEach(function(el) {
          el.style.display = 'none';
        });

        let container = section.querySelector('.shreeyog-art-container');
        if (!container) {
          container = document.createElement('div');
          container.className = 'shreeyog-art-container';
          container.innerHTML = window.__SHREEYOG_ART_HTML__;
          section.appendChild(container);
        }
      }

      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', ensureSectionIntegrity);
      } else {
        ensureSectionIntegrity();
      }
      window.addEventListener('load', ensureSectionIntegrity);
      setTimeout(ensureSectionIntegrity, 100);
      setTimeout(ensureSectionIntegrity, 500);
      setTimeout(ensureSectionIntegrity, 1200);

      const secEl = document.querySelector('.c-objects');
      if (secEl) {
        const obs = new MutationObserver(function() {
          ensureSectionIntegrity();
        });
        obs.observe(secEl, { childList: true });
      }
    })();
    </script>
  </section>`;

function updateHtmlFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  let html = fs.readFileSync(filePath, 'utf8');

  // Inject or update style tag
  const styleBlock = `<style id="shreeyog-art-of-living-css">\n${cssContent}\n</style>`;
  if (html.includes('<style id="shreeyog-art-of-living-css">')) {
    const sStart = html.indexOf('<style id="shreeyog-art-of-living-css">');
    const sEnd = html.indexOf('</style>', sStart) + '</style>'.length;
    html = html.substring(0, sStart) + styleBlock + html.substring(sEnd);
  } else {
    html = html.replace('</head>', styleBlock + '\n</head>');
  }

  // Replace <section class="c-objects" ...>...</section>
  const regex = /<section[^>]*class=["'][^"']*c-objects[^"']*["'][^>]*>/;
  const match = regex.exec(html);
  if (match) {
    const sIdx = match.index;
    const eIdx = html.indexOf('</section>', sIdx) + '</section>'.length;
    html = html.substring(0, sIdx) + completeSectionHtml + html.substring(eIdx);
    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`Updated ${filePath}!`);
  }
}

updateHtmlFile('public/index.html');
updateHtmlFile('pages/index.html');

console.log('=== Finished Complete Art of Living Implementation ===');
