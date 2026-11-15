const fs = require('fs');
const path = require('path');

const htmlPath = 'D:/Shreeyogweb/obsidianassembly.com/index.html';
let html = fs.readFileSync(htmlPath, 'utf8');

// 1. Remove ship.webp and star mask from CSS so our refined map shows cleanly
const mapCssOverrides = `
/* ===================================================
   SHREEYOG PROJECT LOCATIONS MAP & INTERACTIVE MARKERS
   =================================================== */

/* Hide legacy Obsidian Assembly sailing ship illustration */
.c-places-after .figure-map[data-v-e539f811]:after {
  background-image: none !important;
  display: none !important;
}

/* Container for the interactive architectural map */
.shreeyog-map-wrapper {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: auto;
  z-index: 2;
  overflow: hidden;
}

/* SVG Map styling */
.shreeyog-map-svg {
  position: absolute;
  right: 0;
  top: 0;
  width: 75%;
  height: 100%;
  max-width: 1200px;
  pointer-events: auto;
  opacity: 0.95;
  transition: opacity 0.5s ease;
}

@media (max-width: 1024px) {
  .shreeyog-map-svg {
    width: 100%;
    opacity: 0.85;
  }
}

/* Gradient fade on left edge so map blends seamlessly behind left editorial text */
.shreeyog-map-fade-mask {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(to right, #f1eade 0%, #f1eade 28%, rgba(241, 234, 222, 0.7) 45%, rgba(241, 234, 222, 0) 70%);
  z-index: 3;
}

/* Location Marker styles */
.shreeyog-marker-group {
  cursor: pointer;
  pointer-events: auto;
  transition: transform 0.4s var(--f-cubic);
}

.shreeyog-marker-group:hover,
.shreeyog-marker-group.is-active {
  transform: translateY(-4px) scale(1.08);
}

.shreeyog-marker-pulse {
  transform-origin: center;
  animation: syPulse 2.8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}

@keyframes syPulse {
  0% { r: 6; opacity: 0.75; stroke-width: 1.5; }
  50% { r: 18; opacity: 0.2; stroke-width: 1; }
  100% { r: 28; opacity: 0; stroke-width: 0.5; }
}

.shreeyog-marker-dot {
  fill: #7b5136;
  stroke: #f1eade;
  stroke-width: 2.5;
  filter: drop-shadow(0 2px 5px rgba(123, 81, 54, 0.35));
  transition: fill 0.3s ease, r 0.3s ease;
}

.shreeyog-marker-group:hover .shreeyog-marker-dot,
.shreeyog-marker-group.is-active .shreeyog-marker-dot {
  fill: #a66d49;
  r: 6.5;
}

/* Minimalist label tag on map */
.shreeyog-marker-label {
  font-family: "Switzer", sans-serif;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  fill: #5a4231;
  pointer-events: none;
  user-select: none;
  transition: fill 0.3s ease;
}

.shreeyog-marker-group:hover .shreeyog-marker-label,
.shreeyog-marker-group.is-active .shreeyog-marker-label {
  fill: #151415;
  font-weight: 600;
}

/* Interactive Project Info Card (Popover on Hover / Click) */
.shreeyog-map-popup {
  position: absolute;
  bottom: 2.5rem;
  right: 3rem;
  background: rgba(241, 234, 222, 0.94);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid rgba(123, 81, 54, 0.22);
  border-radius: 0.4rem;
  padding: 1.25rem 1.6rem;
  min-width: 280px;
  max-width: 340px;
  box-shadow: 0 15px 35px rgba(123, 81, 54, 0.12), 0 4px 12px rgba(0,0,0,0.05);
  pointer-events: auto;
  z-index: 10;
  transition: all 0.4s var(--f-cubic);
  opacity: 1;
}

.shreeyog-map-popup .popup-tag {
  font-family: "Switzer", sans-serif;
  font-size: 0.65rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #7b5136;
  margin-bottom: 0.4rem;
  display: block;
}

.shreeyog-map-popup .popup-title {
  font-family: "Voyage", serif;
  font-size: 1.45rem;
  line-height: 1.15;
  color: #151415;
  margin-bottom: 0.4rem;
  font-weight: 400;
}

.shreeyog-map-popup .popup-desc {
  font-family: "Switzer", sans-serif;
  font-size: 0.78rem;
  line-height: 1.45;
  color: #6a574a;
  margin: 0;
}

.shreeyog-map-popup .popup-coords {
  margin-top: 0.6rem;
  padding-top: 0.6rem;
  border-top: 1px solid rgba(123, 81, 54, 0.12);
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: "Switzer", sans-serif;
  font-size: 0.65rem;
  letter-spacing: 0.1em;
  color: #8c7665;
}

.shreeyog-map-popup .popup-status {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
}

.shreeyog-map-popup .popup-status-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #7b5136;
}
`;

// Build the refined SVG map markup
const shreeyogSvgMap = `
<div class="shreeyog-map-wrapper" id="shreeyog-project-map">
  <div class="shreeyog-map-fade-mask"></div>
  <svg class="shreeyog-map-svg" viewBox="0 0 1000 850" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Subtle map water gradient -->
      <linearGradient id="godavariGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#7b5136" stop-opacity="0.35" />
        <stop offset="50%" stop-color="#9e8a75" stop-opacity="0.25" />
        <stop offset="100%" stop-color="#7b5136" stop-opacity="0.3" />
      </linearGradient>
      <!-- Highway dash pattern -->
      <pattern id="gridPattern" width="60" height="60" patternUnits="userSpaceOnUse">
        <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#7b5136" stroke-width="0.3" stroke-opacity="0.08" />
      </pattern>
    </defs>

    <!-- Cartographic Grid Background -->
    <rect width="1000" height="850" fill="url(#gridPattern)" />

    <!-- Topographic contour rings (Stylized Nashik / Sahyadri terrain) -->
    <g opacity="0.18" stroke="#7b5136" stroke-width="0.7" fill="none" stroke-linecap="round">
      <ellipse cx="680" cy="380" rx="280" ry="190" />
      <ellipse cx="690" cy="390" rx="360" ry="250" />
      <ellipse cx="670" cy="370" rx="430" ry="310" />
      <ellipse cx="420" cy="650" rx="200" ry="140" stroke-dasharray="3,4" />
      <ellipse cx="410" cy="660" rx="280" ry="190" stroke-dasharray="3,4" />
    </g>

    <!-- Godavari River gracefully winding across Nashik -->
    <path d="M 320 230 C 440 260, 520 280, 580 320 C 650 370, 720 360, 800 390 C 880 420, 930 450, 990 470" 
          fill="none" stroke="url(#godavariGrad)" stroke-width="4.5" stroke-linecap="round" />
    <path d="M 320 230 C 440 260, 520 280, 580 320 C 650 370, 720 360, 800 390 C 880 420, 930 450, 990 470" 
          fill="none" stroke="#f1eade" stroke-width="1.2" stroke-linecap="round" stroke-dasharray="6,8" opacity="0.6" />
    <text x="830" y="380" font-family="Switzer, sans-serif" font-size="8.5" letter-spacing="0.22em" fill="#8c7665" text-transform="uppercase" opacity="0.8">GODAVARI RIVER</text>

    <!-- Arterial Boulevards & Corridors -->
    <!-- Gangapur Road Axis -->
    <path d="M 430 240 L 640 370" stroke="#7b5136" stroke-width="1.2" stroke-dasharray="4,3" opacity="0.25" />
    <text x="470" y="275" font-family="Switzer, sans-serif" font-size="7.5" letter-spacing="0.16em" fill="#8c7665" transform="rotate(31 470 275)" opacity="0.65">GANGAPUR ROAD</text>

    <!-- College Road Axis -->
    <path d="M 520 320 L 680 440" stroke="#7b5136" stroke-width="1" stroke-dasharray="3,3" opacity="0.22" />

    <!-- Mumbai-Nashik Highway Corridor (NH 160 connecting Nashik to Ghoti) -->
    <path d="M 640 480 C 580 540, 500 610, 420 690" stroke="#7b5136" stroke-width="1.6" stroke-dasharray="6,4" opacity="0.32" />
    <text x="490" y="605" font-family="Switzer, sans-serif" font-size="8" letter-spacing="0.18em" fill="#7b5136" transform="rotate(-44 490 605)" opacity="0.7">NH 160 • MUMBAI - NASHIK HIGHWAY</text>

    <!-- Regional Cartographic Compass & Coordinates -->
    <g transform="translate(860, 110)" opacity="0.6">
      <circle cx="0" cy="0" r="32" fill="none" stroke="#7b5136" stroke-width="0.8" />
      <circle cx="0" cy="0" r="28" fill="none" stroke="#7b5136" stroke-width="0.4" stroke-dasharray="2,2" />
      <line x1="0" y1="-38" x2="0" y2="38" stroke="#7b5136" stroke-width="0.8" />
      <line x1="-38" y1="0" x2="38" y2="0" stroke="#7b5136" stroke-width="0.8" />
      <polygon points="0,-28 4,-12 0,-16 -4,-12" fill="#7b5136" />
      <text x="0" y="-42" font-family="Switzer, sans-serif" font-size="9" font-weight="600" fill="#7b5136" text-anchor="middle">N</text>
      <text x="0" y="52" font-family="Switzer, sans-serif" font-size="7" letter-spacing="0.16em" fill="#8c7665" text-anchor="middle">20°00'N 73°47'E</text>
    </g>

    <!-- Geographic Labels -->
    <text x="690" y="270" font-family="Voyage, serif" font-size="20" fill="#7b5136" opacity="0.28" letter-spacing="0.08em">Nashik</text>
    <text x="360" y="740" font-family="Voyage, serif" font-size="18" fill="#7b5136" opacity="0.28" letter-spacing="0.08em">Ghoti</text>

    <!-- ============================================== -->
    <!-- SHREEYOG PROJECT LOCATION MARKERS (INTERACTIVE) -->
    <!-- ============================================== -->

    <!-- 1. SHREE BRAMHAND & SHREE NISARG (Gangapur Road) -->
    <g class="shreeyog-marker-group" data-project="Shree Bramhand & Shree Nisarg" data-location="Gangapur Road, Nashik" data-desc="Signature high-rise residential towers surrounded by landscaped boulevards and open skies." data-coords="19.9982° N, 73.7461° E" data-status="Premier Living" transform="translate(480, 260)">
      <circle class="shreeyog-marker-pulse" cx="0" cy="0" r="6" stroke="#7b5136" fill="none" />
      <circle class="shreeyog-marker-dot" cx="0" cy="0" r="4.5" />
      <text class="shreeyog-marker-label" x="12" y="4">SHREE BRAMHAND</text>
    </g>

    <!-- 2. SHREE VENKATESH (College Road) -->
    <g class="shreeyog-marker-group" data-project="Shree Venkatesh" data-location="College Road, Nashik" data-desc="Bespoke luxury residences positioned in the vibrant heart of Nashik's premier cultural district." data-coords="20.0012° N, 73.7624° E" data-status="Prime Enclave" transform="translate(560, 335)">
      <circle class="shreeyog-marker-pulse" cx="0" cy="0" r="6" stroke="#7b5136" fill="none" style="animation-delay: 0.6s;" />
      <circle class="shreeyog-marker-dot" cx="0" cy="0" r="4.5" />
      <text class="shreeyog-marker-label" x="12" y="4">SHREE VENKATESH</text>
    </g>

    <!-- 3. SHREE NEELKANTH (Panchavati) -->
    <g class="shreeyog-marker-group" data-project="Shree Neelkanth" data-location="Panchavati, Nashik" data-desc="Timeless architectural apartments across the sacred banks of the Godavari River." data-coords="20.0118° N, 73.7995° E" data-status="Scenic Living" transform="translate(730, 310)">
      <circle class="shreeyog-marker-pulse" cx="0" cy="0" r="6" stroke="#7b5136" fill="none" style="animation-delay: 1.2s;" />
      <circle class="shreeyog-marker-dot" cx="0" cy="0" r="4.5" />
      <text class="shreeyog-marker-label" x="12" y="4">SHREE NEELKANTH</text>
    </g>

    <!-- 4. SHREE SAMRUDDHI PARK (Govind Nagar) -->
    <g class="shreeyog-marker-group" data-project="Shree Samruddhi Park" data-location="Govind Nagar, Nashik" data-desc="Stepped multi-wing residential community combining expansive family homes with lush greenery." data-coords="19.9810° N, 73.7715° E" data-status="Garden Community" transform="translate(620, 420)">
      <circle class="shreeyog-marker-pulse" cx="0" cy="0" r="6" stroke="#7b5136" fill="none" style="animation-delay: 0.3s;" />
      <circle class="shreeyog-marker-dot" cx="0" cy="0" r="4.5" />
      <text class="shreeyog-marker-label" x="12" y="4">SHREE SAMRUDDHI PARK</text>
    </g>

    <!-- 5. SHREE SAFALYA & SHREE SHAKUNTAL (Indira Nagar) -->
    <g class="shreeyog-marker-group" data-project="Shree Safalya & Shree Shakuntal" data-location="Indira Nagar, Nashik" data-desc="Contemporary residential landmark featuring signature architectural facade accents and terraces." data-coords="19.9678° N, 73.7842° E" data-status="Urban Landmark" transform="translate(690, 465)">
      <circle class="shreeyog-marker-pulse" cx="0" cy="0" r="6" stroke="#7b5136" fill="none" style="animation-delay: 0.9s;" />
      <circle class="shreeyog-marker-dot" cx="0" cy="0" r="4.5" />
      <text class="shreeyog-marker-label" x="12" y="4">SHREE SAFALYA</text>
    </g>

    <!-- 6. SHREE VISWA (Pathardi Phata) -->
    <g class="shreeyog-marker-group" data-project="Shree Viswa" data-location="Pathardi Phata, Nashik" data-desc="Sophisticated multi-tower residential complex located at the prime southern gateway of Nashik." data-coords="19.9482° N, 73.7635° E" data-status="Highway Gateway" transform="translate(590, 520)">
      <circle class="shreeyog-marker-pulse" cx="0" cy="0" r="6" stroke="#7b5136" fill="none" style="animation-delay: 1.5s;" />
      <circle class="shreeyog-marker-dot" cx="0" cy="0" r="4.5" />
      <text class="shreeyog-marker-label" x="12" y="4">SHREE VISWA</text>
    </g>

    <!-- 7. SHREE MURLIDHAR PARK (Ghoti) -->
    <g class="shreeyog-marker-group" data-project="Shree Murlidhar Park" data-location="Ghoti, Nashik District" data-desc="Serene foothills township offering expansive vistas near Igatpuri and Mumbai expressway." data-coords="19.7214° N, 73.6685° E" data-status="Scenic Township" transform="translate(410, 715)">
      <circle class="shreeyog-marker-pulse" cx="0" cy="0" r="6" stroke="#7b5136" fill="none" style="animation-delay: 1.8s;" />
      <circle class="shreeyog-marker-dot" cx="0" cy="0" r="4.5" />
      <text class="shreeyog-marker-label" x="12" y="4">SHREE MURLIDHAR PARK (GHOTI)</text>
    </g>
  </svg>

  <!-- Interactive Project Popover Card -->
  <div class="shreeyog-map-popup" id="shreeyog-map-popup">
    <span class="popup-tag" id="sy-popup-tag">PREMIER LIVING</span>
    <h4 class="popup-title" id="sy-popup-title">Shree Bramhand</h4>
    <p class="popup-desc" id="sy-popup-desc">Signature high-rise residential towers surrounded by landscaped boulevards and open skies in Gangapur Road, Nashik.</p>
    <div class="popup-coords">
      <span class="popup-status"><span class="popup-status-dot"></span><span id="sy-popup-loc">Gangapur Road, Nashik</span></span>
      <span id="sy-popup-coords">19.9982° N, 73.7461° E</span>
    </div>
  </div>
</div>
`;

// Client-side script for interactive marker hover/click handling
const shreeyogMapScript = `
<script>
(function() {
  function initShreeyogMap() {
    const markers = document.querySelectorAll('.shreeyog-marker-group');
    const popup = document.getElementById('shreeyog-map-popup');
    const pTag = document.getElementById('sy-popup-tag');
    const pTitle = document.getElementById('sy-popup-title');
    const pDesc = document.getElementById('sy-popup-desc');
    const pLoc = document.getElementById('sy-popup-loc');
    const pCoords = document.getElementById('sy-popup-coords');

    if (!markers.length || !popup) return;

    markers.forEach(m => {
      function activate() {
        markers.forEach(other => other.classList.remove('is-active'));
        m.classList.add('is-active');

        const project = m.getAttribute('data-project');
        const location = m.getAttribute('data-location');
        const desc = m.getAttribute('data-desc');
        const coords = m.getAttribute('data-coords');
        const status = m.getAttribute('data-status');

        if (pTag) pTag.textContent = status || 'RESIDENTIAL';
        if (pTitle) pTitle.textContent = project || '';
        if (pDesc) pDesc.textContent = desc || '';
        if (pLoc) pLoc.textContent = location || '';
        if (pCoords) pCoords.textContent = coords || '';
      }

      m.addEventListener('mouseenter', activate);
      m.addEventListener('click', activate);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initShreeyogMap);
  } else {
    initShreeyogMap();
  }
})();
</script>
`;

// Insert the CSS into index.html
if (!html.includes('/* SHREEYOG PROJECT LOCATIONS MAP')) {
  html = html.replace('</style>\n</head>', `${mapCssOverrides}\n</style>\n</head>`);
  console.log('✓ Injected map CSS overrides');
}

// Replace the contents of .figure-map in index.html with the shreeyogSvgMap
const figMapStart = html.indexOf('<div class="figure-map"');
const figMapEnd = html.indexOf('</div><svg class="places-after-path"', figMapStart);

if (figMapStart !== -1 && figMapEnd !== -1) {
  const newFigMapBlock = `<div class="figure-map" string="progress" string-id="figure-map" data-v-e539f811>${shreeyogSvgMap}</div>`;
  html = html.slice(0, figMapStart) + newFigMapBlock + html.slice(figMapEnd + 6); // +6 for </div>
  console.log('✓ Replaced .figure-map with interactive Shreeyog map');
} else {
  console.log('Warning: figure-map bounds not found in index.html');
}

// Insert the client-side script before </body>
if (!html.includes('initShreeyogMap')) {
  html = html.replace('</body>', `${shreeyogMapScript}\n</body>`);
  console.log('✓ Injected shreeyogMapScript');
}

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Saved updated index.html');
