const fs = require('fs');
const path = require('path');

const basePath = 'D:/Shreeyogweb/obsidianassembly.com';

// 1. Build the refined SVG and interactive map markup
const originalSvgPath = `<svg class="places-after-path" viewBox="0 0 1440 1080" preserveAspectRatio="none" data-v-e539f811><linearGradient id="places-after-path-gradient" x1="0" y1="0" x2="0" y2="1" data-v-e539f811><stop offset="0" stop-color="#7b5136" data-v-e539f811></stop><stop offset=".5" stop-color="#f1eade" data-v-e539f811></stop><stop offset="1" stop-color="#15141500" data-v-e539f811></stop></linearGradient><path fill="none" stroke="url(#places-after-path-gradient)" stroke-width="1" d="M109.3,0c-236.8,136.6,1005.1,38.6,576.7,146-245.3,61.5-347.8,189.4-433.3,280-70.1,74.3-126.5,86.3-134.9,60.6-48.9-149.4,1182-116.9,997.2,102.4-123.2,146.2-14.9,162.2,325,47.8" vector-effect="non-scaling-stroke" data-v-e539f811></path></svg>`;

const interactiveMapHtml = `
<div class="shreeyog-map-wrapper" id="shreeyog-project-map" data-v-e539f811>
  <div class="shreeyog-map-fade-mask" data-v-e539f811></div>
  <svg class="shreeyog-map-svg" viewBox="0 0 1000 850" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" data-v-e539f811>
    <defs data-v-e539f811>
      <linearGradient id="godavariGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#7b5136" stop-opacity="0.32" />
        <stop offset="50%" stop-color="#9e8a75" stop-opacity="0.22" />
        <stop offset="100%" stop-color="#7b5136" stop-opacity="0.28" />
      </linearGradient>
      <pattern id="gridPattern" width="60" height="60" patternUnits="userSpaceOnUse">
        <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#7b5136" stroke-width="0.3" stroke-opacity="0.08" />
      </pattern>
    </defs>

    <rect width="1000" height="850" fill="url(#gridPattern)" />

    <!-- Topographic contour rings (Sahyadri terrain) -->
    <g opacity="0.18" stroke="#7b5136" stroke-width="0.7" fill="none" stroke-linecap="round">
      <ellipse cx="680" cy="380" rx="280" ry="190" />
      <ellipse cx="690" cy="390" rx="360" ry="250" />
      <ellipse cx="670" cy="370" rx="430" ry="310" />
      <ellipse cx="420" cy="650" rx="200" ry="140" stroke-dasharray="3,4" />
      <ellipse cx="410" cy="660" rx="280" ry="190" stroke-dasharray="3,4" />
    </g>

    <!-- Godavari River across Nashik -->
    <path d="M 320 230 C 440 260, 520 280, 580 320 C 650 370, 720 360, 800 390 C 880 420, 930 450, 990 470" 
          fill="none" stroke="url(#godavariGrad)" stroke-width="4.5" stroke-linecap="round" />
    <path d="M 320 230 C 440 260, 520 280, 580 320 C 650 370, 720 360, 800 390 C 880 420, 930 450, 990 470" 
          fill="none" stroke="#f1eade" stroke-width="1.2" stroke-linecap="round" stroke-dasharray="6,8" opacity="0.6" />
    <text x="830" y="380" font-family="Switzer, sans-serif" font-size="8.5" letter-spacing="0.22em" fill="#8c7665" text-transform="uppercase" opacity="0.8">GODAVARI RIVER</text>

    <!-- Arterial Boulevards & Corridors -->
    <path d="M 430 240 L 640 370" stroke="#7b5136" stroke-width="1.2" stroke-dasharray="4,3" opacity="0.25" />
    <text x="470" y="275" font-family="Switzer, sans-serif" font-size="7.5" letter-spacing="0.16em" fill="#8c7665" transform="rotate(31 470 275)" opacity="0.65">GANGAPUR ROAD</text>

    <path d="M 520 320 L 680 440" stroke="#7b5136" stroke-width="1" stroke-dasharray="3,3" opacity="0.22" />

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

    <!-- SHREEYOG PROJECT LOCATION MARKERS -->
    <!-- 1. SHREE BRAMHAND (Gangapur Road) -->
    <g class="shreeyog-marker-group" data-project="Shree Bramhand" data-location="Gangapur Road, Nashik" data-desc="Signature high-rise residential development surrounded by landscaped boulevards and open skies." data-coords="19.9982° N, 73.7461° E" data-status="Premier Living" transform="translate(480, 260)">
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
    <g class="shreeyog-marker-group" data-project="Shree Neelkanth" data-location="Panchavati, Nashik" data-desc="Timeless architectural residences across the sacred banks of the Godavari River." data-coords="20.0118° N, 73.7995° E" data-status="Scenic Living" transform="translate(730, 310)">
      <circle class="shreeyog-marker-pulse" cx="0" cy="0" r="6" stroke="#7b5136" fill="none" style="animation-delay: 1.2s;" />
      <circle class="shreeyog-marker-dot" cx="0" cy="0" r="4.5" />
      <text class="shreeyog-marker-label" x="12" y="4">SHREE NEELKANTH</text>
    </g>

    <!-- 4. SHREE SAMRUDDHI PARK (Govind Nagar) -->
    <g class="shreeyog-marker-group" data-project="Shree Samruddhi Park" data-location="Govind Nagar, Nashik" data-desc="Stepped architectural residential community combining expansive living with lush gardens." data-coords="19.9810° N, 73.7715° E" data-status="Garden Community" transform="translate(620, 420)">
      <circle class="shreeyog-marker-pulse" cx="0" cy="0" r="6" stroke="#7b5136" fill="none" style="animation-delay: 0.3s;" />
      <circle class="shreeyog-marker-dot" cx="0" cy="0" r="4.5" />
      <text class="shreeyog-marker-label" x="12" y="4">SHREE SAMRUDDHI PARK</text>
    </g>

    <!-- 5. SHREE SAFALYA (Indira Nagar) -->
    <g class="shreeyog-marker-group" data-project="Shree Safalya" data-location="Indira Nagar, Nashik" data-desc="Contemporary residential landmark featuring signature architectural facade accents and terraces." data-coords="19.9678° N, 73.7842° E" data-status="Urban Landmark" transform="translate(690, 465)">
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
    <g class="shreeyog-marker-group" data-project="Shree Murlidhar Park" data-location="Ghoti, Nashik District" data-desc="Serene foothills residential township offering expansive vistas near Igatpuri and Mumbai expressway." data-coords="19.7214° N, 73.6685° E" data-status="Scenic Township" transform="translate(410, 715)">
      <circle class="shreeyog-marker-pulse" cx="0" cy="0" r="6" stroke="#7b5136" fill="none" style="animation-delay: 1.8s;" />
      <circle class="shreeyog-marker-dot" cx="0" cy="0" r="4.5" />
      <text class="shreeyog-marker-label" x="12" y="4">SHREE MURLIDHAR PARK (GHOTI)</text>
    </g>
  </svg>

  <!-- Interactive Project Popover Card -->
  <div class="shreeyog-map-popup" id="shreeyog-map-popup" data-v-e539f811>
    <span class="popup-tag" id="sy-popup-tag">PREMIER LIVING</span>
    <h4 class="popup-title" id="sy-popup-title">Shree Bramhand</h4>
    <p class="popup-desc" id="sy-popup-desc">Signature high-rise residential development surrounded by landscaped boulevards and open skies in Gangapur Road, Nashik.</p>
    <div class="popup-coords">
      <span class="popup-status"><span class="popup-status-dot"></span><span id="sy-popup-loc">Gangapur Road, Nashik</span></span>
      <span id="sy-popup-coords">19.9982° N, 73.7461° E</span>
    </div>
  </div>
</div>
`.replace(/\n\s*/g, ''); // Compact HTML string

// Combine original SVG line + interactive map into one single-quoted string
const combinedStaticVNode = originalSvgPath + interactiveMapHtml;

// 2. UPDATE _nuxt/index.d0184b9b.js
const jsPath = path.join(basePath, '_nuxt/index.d0184b9b.js');
let js = fs.readFileSync(jsPath, 'utf8');

const targetStart = "n[5]||(n[5]=ae('<svg class=\"places-after-path\"";
const start = js.indexOf(targetStart);

if (start !== -1) {
  const end = js.indexOf("',1))", start) + 5;
  const replacement = `n[5]||(n[5]=ae('${combinedStaticVNode}',1))`;
  js = js.slice(0, start) + replacement + js.slice(end);
  fs.writeFileSync(jsPath, js, 'utf8');
  console.log('✓ Successfully replaced n[5] static VNode in _nuxt/index.d0184b9b.js');
} else {
  console.error('ERROR: targetStart not found in JS');
  process.exit(1);
}

// 3. UPDATE index.html
const htmlPath = path.join(basePath, 'index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// Also update the static HTML markup in index.html to match
const htmlSvgStart = html.indexOf('<svg class="places-after-path"');
const htmlSvgEnd = html.indexOf('</svg>', htmlSvgStart) + 6;

if (htmlSvgStart !== -1 && htmlSvgEnd !== -1) {
  html = html.slice(0, htmlSvgStart) + combinedStaticVNode + html.slice(htmlSvgEnd);
  console.log('✓ Successfully updated static VNode in index.html');
} else {
  console.error('ERROR: SVG bounds not found in index.html');
  process.exit(1);
}

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('ALL CHANGES SAVED SUCCESSFULLY!');
