const fs = require('fs');
const path = require('path');

const basePath = 'D:/Shreeyogweb/obsidianassembly.com';

// ==========================================
// 1. UPDATE _nuxt/index.d0184b9b.js
// ==========================================
const jsPath = path.join(basePath, '_nuxt/index.d0184b9b.js');
let js = fs.readFileSync(jsPath, 'utf8');

// A. Replace active step in Xe definition
const oldXe = '"string-active-step":"places-sequencer[3]"';
const newXe = '"string-active-step":"places-sequencer[0]"';
if (js.includes(oldXe)) {
  js = js.replace(oldXe, newXe);
  console.log('✓ JS replaced string-active-step [3] -> [0]');
} else {
  console.log('Warning: oldXe not found in JS');
}

// B. Replace i initial value
const oldI = 'const{$stringTune:e}=O(),i=A(3),t=';
const newI = 'const{$stringTune:e}=O(),i=A(0),t=';
if (js.includes(oldI)) {
  js = js.replace(oldI, newI);
  console.log('✓ JS replaced i=A(3) -> i=A(0)');
} else {
  console.log('Warning: oldI not found in JS');
}

// C. Replace array t with the exact 6 projects
const oldTRegex = /t=\[\{name:"Shree Murlidhar Park[^\]]*\]/;
const newT = `t=[` +
  `{name:"Shree Bramhand",src:"/images/shreeyog/slider/shree-bramhand.webp"},` +
  `{name:"Shree Viswa",src:"/images/shreeyog/slider/shree-viswa.webp"},` +
  `{name:"Shree Safalya",src:"/images/shreeyog/slider/shree-safalya.webp"},` +
  `{name:"Shree Samruddhi Park",src:"/images/shreeyog/slider/shree-samruddhi-park.webp"},` +
  `{name:"Shree Venkatesh",src:"/images/shreeyog/slider/shree-venkatesh.webp"},` +
  `{name:"Shree Neelkanth",src:"/images/shreeyog/slider/shree-neelkanth.webp"}` +
`]`;

if (oldTRegex.test(js)) {
  js = js.replace(oldTRegex, newT);
  console.log('✓ JS replaced array t with 6 Shreeyog projects');
} else {
  console.error('ERROR: oldTRegex did not match in JS');
  process.exit(1);
}

// D. Replace counter total /7 with /6
const oldCounter = 'u[0]||(u[0]=s("span",null,"/7",-1))';
const newCounter = 'u[0]||(u[0]=s("span",null,"/6",-1))';
if (js.includes(oldCounter)) {
  js = js.replace(oldCounter, newCounter);
  console.log('✓ JS replaced counter /7 -> /6');
} else {
  console.log('Warning: oldCounter not found in JS');
}

fs.writeFileSync(jsPath, js, 'utf8');
console.log('Saved updated index.d0184b9b.js');


// ==========================================
// 2. UPDATE index.html
// ==========================================
const htmlPath = path.join(basePath, 'index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// A. Replace active step in sequence-controller
const oldHtmlSeqController = 'string-active-step="places-sequencer[3]" data-v-7eb8a498>';
const newHtmlSeqController = 'string-active-step="places-sequencer[0]" data-v-7eb8a498>';
if (html.includes(oldHtmlSeqController)) {
  html = html.replace(oldHtmlSeqController, newHtmlSeqController);
  console.log('✓ HTML replaced active step [3] -> [0]');
}

// B. Replace the 7 sequence slides with 6 slides
const seqStart = html.indexOf('<div class="sequence-controller"');
const seqEnd = html.indexOf('</div></div><div class="sequesnce-nav"', seqStart);

if (seqStart !== -1 && seqEnd !== -1) {
  const oldSeqBlock = html.slice(seqStart, seqEnd);
  
  const newSeqBlock = `<div class="sequence-controller" string-copy-from="progress-end" string="sequence" string-entering-duration="places-sequencer[50]" string-leaving-duration="places-sequencer[1500]" string-active-step="places-sequencer[0]" data-v-7eb8a498><!--[-->` +
    `<figure class="-fit -active" decoding="async" string="sequence" string-sequence-trigger="places-sequencer[0]" data-v-7eb8a498 data-v-ec47b9e2><img string="lazy" string-lazy="/images/shreeyog/slider/shree-bramhand.webp" src="/images/shreeyog/slider/shree-bramhand.webp" alt="Shree Bramhand" data-v-ec47b9e2><!----></figure>` +
    `<figure class="-fit" decoding="async" string="sequence" string-sequence-trigger="places-sequencer[1]" data-v-7eb8a498 data-v-ec47b9e2><img string="lazy" string-lazy="/images/shreeyog/slider/shree-viswa.webp" src="/images/shreeyog/slider/shree-viswa.webp" alt="Shree Viswa" data-v-ec47b9e2><!----></figure>` +
    `<figure class="-fit" decoding="async" string="sequence" string-sequence-trigger="places-sequencer[2]" data-v-7eb8a498 data-v-ec47b9e2><img string="lazy" string-lazy="/images/shreeyog/slider/shree-safalya.webp" src="/images/shreeyog/slider/shree-safalya.webp" alt="Shree Safalya" data-v-ec47b9e2><!----></figure>` +
    `<figure class="-fit" decoding="async" string="sequence" string-sequence-trigger="places-sequencer[3]" data-v-7eb8a498 data-v-ec47b9e2><img string="lazy" string-lazy="/images/shreeyog/slider/shree-samruddhi-park.webp" src="/images/shreeyog/slider/shree-samruddhi-park.webp" alt="Shree Samruddhi Park" data-v-ec47b9e2><!----></figure>` +
    `<figure class="-fit" decoding="async" string="sequence" string-sequence-trigger="places-sequencer[4]" data-v-7eb8a498 data-v-ec47b9e2><img string="lazy" string-lazy="/images/shreeyog/slider/shree-venkatesh.webp" src="/images/shreeyog/slider/shree-venkatesh.webp" alt="Shree Venkatesh" data-v-ec47b9e2><!----></figure>` +
    `<figure class="-fit" decoding="async" string="sequence" string-sequence-trigger="places-sequencer[5]" data-v-7eb8a498 data-v-ec47b9e2><img string="lazy" string-lazy="/images/shreeyog/slider/shree-neelkanth.webp" src="/images/shreeyog/slider/shree-neelkanth.webp" alt="Shree Neelkanth" data-v-ec47b9e2><!----></figure>` +
    `<!--]-->`;

  html = html.slice(0, seqStart) + newSeqBlock + html.slice(seqEnd);
  console.log('✓ HTML replaced sequence-controller slides');
} else {
  console.error('ERROR: sequence-controller bounds not found in HTML');
  process.exit(1);
}

// C. Replace initial active place name
const oldPlaceName = '<span class="place-name -h5" data-v-7eb8a498><span string="split" string-split="char" data-v-7eb8a498>Shree Venkatesh, Nashik</span></span>';
const oldPlaceName2 = '<span class="place-name -h5" data-v-7eb8a498><span string="split" string-split="char" data-v-7eb8a498>Silent Room</span></span>';
const newPlaceName = '<span class="place-name -h5" data-v-7eb8a498><span string="split" string-split="char" data-v-7eb8a498>Shree Bramhand</span></span>';

if (html.includes(oldPlaceName)) {
  html = html.replace(oldPlaceName, newPlaceName);
  console.log('✓ HTML replaced place-name -> Shree Bramhand');
} else if (html.includes(oldPlaceName2)) {
  html = html.replace(oldPlaceName2, newPlaceName);
  console.log('✓ HTML replaced place-name (Silent Room) -> Shree Bramhand');
}

// D. Replace counter in HTML
const oldHtmlCounter = '<div class="order -h5" data-v-7eb8a498><span data-v-7eb8a498><span data-v-7eb8a498>4</span><span data-v-7eb8a498>/7</span></span></div>';
const newHtmlCounter = '<div class="order -h5" data-v-7eb8a498><span data-v-7eb8a498><span data-v-7eb8a498>1</span><span data-v-7eb8a498>/6</span></span></div>';

if (html.includes(oldHtmlCounter)) {
  html = html.replace(oldHtmlCounter, newHtmlCounter);
  console.log('✓ HTML replaced counter -> 1/6');
} else {
  // Try regex replace
  html = html.replace(
    /<div class="order -h5"[^>]*><span[^>]*><span[^>]*>\d+<\/span><span[^>]*>\/\d+<\/span><\/span><\/div>/,
    newHtmlCounter
  );
  console.log('✓ HTML replaced counter via regex -> 1/6');
}

// E. Add custom CSS for central slider images: object-fit: contain, no zoom crop
const sliderCss = `
/* Central featured project slider image fitting - full building visibility */
.c-places .places-story .-w .sticky-container .-gc .sequence-container .sequence-controller figure img[data-v-7eb8a498] {
  object-fit: contain !important;
  background-color: #121110 !important;
  transform: translateZ(0) scale(1) !important;
  width: 100% !important;
  height: 100% !important;
}
.c-places .places-story .-w .sticky-container .-gc .sequence-container .sequence-controller figure.-active[data-v-7eb8a498] img {
  transform: translateZ(0) scale(1) !important;
}
`;

if (!html.includes('/* Central featured project slider image fitting')) {
  html = html.replace('</style>\n</head>', `${sliderCss}\n</style>\n</head>`);
  console.log('✓ Injected slider CSS rules');
}

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Saved updated index.html');
console.log('ALL SLIDER UPDATES COMPLETED SUCCESSFULLY!');
