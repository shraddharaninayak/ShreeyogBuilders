const fs = require('fs');

console.log('--- Applying Places Gallery Interior Updates ---');

// 1. Update public/_nuxt/index.d0184b9b.js
const jsPath = 'd:/Shreeyogweb/public/_nuxt/index.d0184b9b.js';
let js = fs.readFileSync(jsPath, 'utf8');

// Target 1: slider items array t
const oldSliderArray = 't=[{name:"Shree Bramhand",src:"/images/shreeyog/slider/shree-bramhand.webp"},{name:"Shree Viswa",src:"/images/shreeyog/slider/shree-viswa.webp"},{name:"Shree Safalya",src:"/images/shreeyog/slider/shree-safalya.webp"},{name:"Shree Samruddhi Park",src:"/images/shreeyog/slider/shree-samruddhi-park.webp"},{name:"Shree Venkatesh",src:"/images/shreeyog/slider/shree-venkatesh.webp"},{name:"Shree Neelkanth",src:"/images/shreeyog/slider/shree-neelkanth.webp"}]';

const newSliderArray = 't=[{name:"Living Room",src:"/images/shreeyog/interiors/living-room.webp"},{name:"Master Bedroom",src:"/images/shreeyog/interiors/master-bedroom.webp"},{name:"Dining Space",src:"/images/shreeyog/interiors/dining-space.webp"},{name:"Residential Lounge",src:"/images/shreeyog/interiors/residential-lounge.webp"},{name:"Private Balcony",src:"/images/shreeyog/interiors/private-balcony.webp"},{name:"Rooftop Terrace",src:"/images/shreeyog/interiors/rooftop-terrace.webp"},{name:"Fitness Lounge",src:"/images/shreeyog/interiors/fitness-lounge.webp"}]';

if (!js.includes(oldSliderArray)) {
  console.error('ERROR: oldSliderArray not found in JS!');
  process.exit(1);
}
js = js.replace(oldSliderArray, newSliderArray);
console.log('Successfully replaced slider array in JS.');

// Target 2: counter in JS
const oldJsCounter = 'u[0]||(u[0]=s("span",null,"/6",-1))';
const newJsCounter = 'u[0]||(u[0]=s("span",null,"/7",-1))';
if (!js.includes(oldJsCounter)) {
  console.error('ERROR: oldJsCounter not found in JS!');
  process.exit(1);
}
js = js.replace(oldJsCounter, newJsCounter);
console.log('Successfully replaced counter in JS.');

// Target 3: outer cards in JS
const oldOuterCards = '!1?$("",!0):(g(),Q(T,{key:0,decoding:"async",fit:"",class:"i i-1",src:"/images/shreeyog/projects/nisarg.webp","string-copy-from":"sticky-container",string:"sequence","string-sequence-trigger":"places-sequencer[1]"})),!1?$("",!0):(g(),Q(T,{key:1,decoding:"async",fit:"",class:"i i-2",src:"/images/shreeyog/projects/safalya-angle.webp","string-copy-from":"sticky-container",string:"sequence","string-sequence-trigger":"places-sequencer[2]"})),!1?$("",!0):(g(),Q(T,{key:2,decoding:"async",fit:"",class:"i i-3",src:"/images/shreeyog/projects/residential-complex.webp","string-copy-from":"sticky-container",string:"sequence","string-sequence-trigger":"places-sequencer[3]"})),!1?$("",!0):(g(),Q(T,{key:3,decoding:"async",fit:"",class:"i i-4",src:"/images/shreeyog/projects/shakuntal.webp","string-copy-from":"sticky-container",string:"sequence","string-sequence-trigger":"places-sequencer[4]"})),!1?$("",!0):(g(),Q(T,{key:4,decoding:"async",fit:"",class:"i i-5",src:"/images/shreeyog/projects/chintan.webp","string-copy-from":"sticky-container",string:"sequence","string-sequence-trigger":"places-sequencer[5]"})),!1?$("",!0):(g(),Q(T,{key:5,decoding:"async",fit:"",class:"i i-6",src:"/images/shreeyog/projects/safalya-tower.webp","string-copy-from":"sticky-container",string:"sequence","string-sequence-trigger":"places-sequencer[5]"}))';

const newOuterCards = '!1?$("",!0):(g(),Q(T,{key:0,decoding:"async",fit:"",class:"i i-1",src:"/images/shreeyog/interiors/living-room.webp","string-copy-from":"sticky-container",string:"sequence","string-sequence-trigger":"places-sequencer[1]"})),!1?$("",!0):(g(),Q(T,{key:1,decoding:"async",fit:"",class:"i i-2",src:"/images/shreeyog/interiors/master-bedroom.webp","string-copy-from":"sticky-container",string:"sequence","string-sequence-trigger":"places-sequencer[2]"})),!1?$("",!0):(g(),Q(T,{key:2,decoding:"async",fit:"",class:"i i-3",src:"/images/shreeyog/interiors/dining-space.webp","string-copy-from":"sticky-container",string:"sequence","string-sequence-trigger":"places-sequencer[3]"})),!1?$("",!0):(g(),Q(T,{key:3,decoding:"async",fit:"",class:"i i-4",src:"/images/shreeyog/interiors/residential-lounge.webp","string-copy-from":"sticky-container",string:"sequence","string-sequence-trigger":"places-sequencer[4]"})),!1?$("",!0):(g(),Q(T,{key:4,decoding:"async",fit:"",class:"i i-5",src:"/images/shreeyog/interiors/private-balcony.webp","string-copy-from":"sticky-container",string:"sequence","string-sequence-trigger":"places-sequencer[5]"})),!1?$("",!0):(g(),Q(T,{key:5,decoding:"async",fit:"",class:"i i-6",src:"/images/shreeyog/interiors/rooftop-terrace.webp","string-copy-from":"sticky-container",string:"sequence","string-sequence-trigger":"places-sequencer[6]"}))';

if (!js.includes(oldOuterCards)) {
  console.error('ERROR: oldOuterCards not found in JS!');
  process.exit(1);
}
js = js.replace(oldOuterCards, newOuterCards);
console.log('Successfully replaced outer cards in JS.');

fs.writeFileSync(jsPath, js, 'utf8');
console.log('Saved updated JS file.');


// 2. Function to update an HTML file
function updateHtmlFile(filePath) {
  let html = fs.readFileSync(filePath, 'utf8');

  // Outer cards in HTML
  const oldHtmlOuterCards = '<figure class="-fit i i-1" decoding="async" string-copy-from="sticky-container" string="sequence" string-sequence-trigger="places-sequencer[1]" data-v-7eb8a498 data-v-ec47b9e2><img string="lazy" string-lazy="/images/shreeyog/projects/nisarg.webp" src="/images/shreeyog/projects/nisarg.webp" alt="Shree Nisarg - Gangapur Road, Nashik" data-v-ec47b9e2><!----></figure><figure class="-fit i i-2" decoding="async" string-copy-from="sticky-container" string="sequence" string-sequence-trigger="places-sequencer[2]" data-v-7eb8a498 data-v-ec47b9e2><img string="lazy" string-lazy="/images/shreeyog/projects/safalya-angle.webp" src="/images/shreeyog/projects/safalya-angle.webp" alt="Shree Safalya - Luxury High-Rise, Nashik" data-v-ec47b9e2><!----></figure><figure class="-fit i i-3" decoding="async" string-copy-from="sticky-container" string="sequence" string-sequence-trigger="places-sequencer[3]" data-v-7eb8a498 data-v-ec47b9e2><img string="lazy" string-lazy="/images/shreeyog/projects/residential-complex.webp" src="/images/shreeyog/projects/residential-complex.webp" alt="Shreeyog Residential Township, Nashik" data-v-ec47b9e2><!----></figure><figure class="-fit i i-4" decoding="async" string-copy-from="sticky-container" string="sequence" string-sequence-trigger="places-sequencer[4]" data-v-7eb8a498 data-v-ec47b9e2><img string="lazy" string-lazy="/images/shreeyog/projects/shakuntal.webp" src="/images/shreeyog/projects/shakuntal.webp" alt="Shree Shakuntal - Indira Nagar, Nashik" data-v-ec47b9e2><!----></figure><figure class="-fit i i-5" decoding="async" string-copy-from="sticky-container" string="sequence" string-sequence-trigger="places-sequencer[5]" data-v-7eb8a498 data-v-ec47b9e2><img string="lazy" string-lazy="/images/shreeyog/projects/chintan.webp" src="/images/shreeyog/projects/chintan.webp" alt="Shree Chintan - 2 BHK Residences, Nashik" data-v-ec47b9e2><!----></figure><figure class="-fit i i-6" decoding="async" string-copy-from="sticky-container" string="sequence" string-sequence-trigger="places-sequencer[5]" data-v-7eb8a498 data-v-ec47b9e2><img string="lazy" string-lazy="/images/shreeyog/projects/safalya-tower.webp" src="/images/shreeyog/projects/safalya-tower.webp" alt="Shree Safalya - Architectural Tower, Nashik" data-v-ec47b9e2><!----></figure>';

  const newHtmlOuterCards = '<figure class="-fit i i-1" decoding="async" string-copy-from="sticky-container" string="sequence" string-sequence-trigger="places-sequencer[1]" data-v-7eb8a498 data-v-ec47b9e2><img string="lazy" string-lazy="/images/shreeyog/interiors/living-room.webp" src="/images/shreeyog/interiors/living-room.webp" alt="Living Room" data-v-ec47b9e2><!----></figure><figure class="-fit i i-2" decoding="async" string-copy-from="sticky-container" string="sequence" string-sequence-trigger="places-sequencer[2]" data-v-7eb8a498 data-v-ec47b9e2><img string="lazy" string-lazy="/images/shreeyog/interiors/master-bedroom.webp" src="/images/shreeyog/interiors/master-bedroom.webp" alt="Master Bedroom" data-v-ec47b9e2><!----></figure><figure class="-fit i i-3" decoding="async" string-copy-from="sticky-container" string="sequence" string-sequence-trigger="places-sequencer[3]" data-v-7eb8a498 data-v-ec47b9e2><img string="lazy" string-lazy="/images/shreeyog/interiors/dining-space.webp" src="/images/shreeyog/interiors/dining-space.webp" alt="Dining Space" data-v-ec47b9e2><!----></figure><figure class="-fit i i-4" decoding="async" string-copy-from="sticky-container" string="sequence" string-sequence-trigger="places-sequencer[4]" data-v-7eb8a498 data-v-ec47b9e2><img string="lazy" string-lazy="/images/shreeyog/interiors/residential-lounge.webp" src="/images/shreeyog/interiors/residential-lounge.webp" alt="Residential Lounge" data-v-ec47b9e2><!----></figure><figure class="-fit i i-5" decoding="async" string-copy-from="sticky-container" string="sequence" string-sequence-trigger="places-sequencer[5]" data-v-7eb8a498 data-v-ec47b9e2><img string="lazy" string-lazy="/images/shreeyog/interiors/private-balcony.webp" src="/images/shreeyog/interiors/private-balcony.webp" alt="Private Balcony" data-v-ec47b9e2><!----></figure><figure class="-fit i i-6" decoding="async" string-copy-from="sticky-container" string="sequence" string-sequence-trigger="places-sequencer[6]" data-v-7eb8a498 data-v-ec47b9e2><img string="lazy" string-lazy="/images/shreeyog/interiors/rooftop-terrace.webp" src="/images/shreeyog/interiors/rooftop-terrace.webp" alt="Rooftop Terrace" data-v-ec47b9e2><!----></figure>';

  if (!html.includes(oldHtmlOuterCards)) {
    console.error(`ERROR: oldHtmlOuterCards not found in ${filePath}!`);
    process.exit(1);
  }
  html = html.replace(oldHtmlOuterCards, newHtmlOuterCards);
  console.log(`Replaced outer cards in ${filePath}.`);

  // Central sequencer figures
  const oldHtmlSeq = '<div class="sequence-controller" string-copy-from="progress-end" string="sequence" string-entering-duration="places-sequencer[50]" string-leaving-duration="places-sequencer[1500]" string-active-step="places-sequencer[0]" data-v-7eb8a498><!--[--><figure class="-fit -active" decoding="async" string="sequence" string-sequence-trigger="places-sequencer[0]" data-v-7eb8a498 data-v-ec47b9e2><img string="lazy" string-lazy="/images/shreeyog/slider/shree-bramhand.webp" src="/images/shreeyog/slider/shree-bramhand.webp" alt="Shree Bramhand" data-v-ec47b9e2><!----></figure><figure class="-fit" decoding="async" string="sequence" string-sequence-trigger="places-sequencer[1]" data-v-7eb8a498 data-v-ec47b9e2><img string="lazy" string-lazy="/images/shreeyog/slider/shree-viswa.webp" src="/images/shreeyog/slider/shree-viswa.webp" alt="Shree Viswa" data-v-ec47b9e2><!----></figure><figure class="-fit" decoding="async" string="sequence" string-sequence-trigger="places-sequencer[2]" data-v-7eb8a498 data-v-ec47b9e2><img string="lazy" string-lazy="/images/shreeyog/slider/shree-safalya.webp" src="/images/shreeyog/slider/shree-safalya.webp" alt="Shree Safalya" data-v-ec47b9e2><!----></figure><figure class="-fit" decoding="async" string="sequence" string-sequence-trigger="places-sequencer[3]" data-v-7eb8a498 data-v-ec47b9e2><img string="lazy" string-lazy="/images/shreeyog/slider/shree-samruddhi-park.webp" src="/images/shreeyog/slider/shree-samruddhi-park.webp" alt="Shree Samruddhi Park" data-v-ec47b9e2><!----></figure><figure class="-fit" decoding="async" string="sequence" string-sequence-trigger="places-sequencer[4]" data-v-7eb8a498 data-v-ec47b9e2><img string="lazy" string-lazy="/images/shreeyog/slider/shree-venkatesh.webp" src="/images/shreeyog/slider/shree-venkatesh.webp" alt="Shree Venkatesh" data-v-ec47b9e2><!----></figure><figure class="-fit" decoding="async" string="sequence" string-sequence-trigger="places-sequencer[5]" data-v-7eb8a498 data-v-ec47b9e2><img string="lazy" string-lazy="/images/shreeyog/slider/shree-neelkanth.webp" src="/images/shreeyog/slider/shree-neelkanth.webp" alt="Shree Neelkanth" data-v-ec47b9e2><!----></figure><!--]--></div>';

  const newHtmlSeq = '<div class="sequence-controller" string-copy-from="progress-end" string="sequence" string-entering-duration="places-sequencer[50]" string-leaving-duration="places-sequencer[1500]" string-active-step="places-sequencer[0]" data-v-7eb8a498><!--[--><figure class="-fit -active" decoding="async" string="sequence" string-sequence-trigger="places-sequencer[0]" data-v-7eb8a498 data-v-ec47b9e2><img string="lazy" string-lazy="/images/shreeyog/interiors/living-room.webp" src="/images/shreeyog/interiors/living-room.webp" alt="Living Room" data-v-ec47b9e2><!----></figure><figure class="-fit" decoding="async" string="sequence" string-sequence-trigger="places-sequencer[1]" data-v-7eb8a498 data-v-ec47b9e2><img string="lazy" string-lazy="/images/shreeyog/interiors/master-bedroom.webp" src="/images/shreeyog/interiors/master-bedroom.webp" alt="Master Bedroom" data-v-ec47b9e2><!----></figure><figure class="-fit" decoding="async" string="sequence" string-sequence-trigger="places-sequencer[2]" data-v-7eb8a498 data-v-ec47b9e2><img string="lazy" string-lazy="/images/shreeyog/interiors/dining-space.webp" src="/images/shreeyog/interiors/dining-space.webp" alt="Dining Space" data-v-ec47b9e2><!----></figure><figure class="-fit" decoding="async" string="sequence" string-sequence-trigger="places-sequencer[3]" data-v-7eb8a498 data-v-ec47b9e2><img string="lazy" string-lazy="/images/shreeyog/interiors/residential-lounge.webp" src="/images/shreeyog/interiors/residential-lounge.webp" alt="Residential Lounge" data-v-ec47b9e2><!----></figure><figure class="-fit" decoding="async" string="sequence" string-sequence-trigger="places-sequencer[4]" data-v-7eb8a498 data-v-ec47b9e2><img string="lazy" string-lazy="/images/shreeyog/interiors/private-balcony.webp" src="/images/shreeyog/interiors/private-balcony.webp" alt="Private Balcony" data-v-ec47b9e2><!----></figure><figure class="-fit" decoding="async" string="sequence" string-sequence-trigger="places-sequencer[5]" data-v-7eb8a498 data-v-ec47b9e2><img string="lazy" string-lazy="/images/shreeyog/interiors/rooftop-terrace.webp" src="/images/shreeyog/interiors/rooftop-terrace.webp" alt="Rooftop Terrace" data-v-ec47b9e2><!----></figure><figure class="-fit" decoding="async" string="sequence" string-sequence-trigger="places-sequencer[6]" data-v-7eb8a498 data-v-ec47b9e2><img string="lazy" string-lazy="/images/shreeyog/interiors/fitness-lounge.webp" src="/images/shreeyog/interiors/fitness-lounge.webp" alt="Fitness Lounge" data-v-ec47b9e2><!----></figure><!--]--></div>';

  if (!html.includes(oldHtmlSeq)) {
    console.error(`ERROR: oldHtmlSeq not found in ${filePath}!`);
    process.exit(1);
  }
  html = html.replace(oldHtmlSeq, newHtmlSeq);
  console.log(`Replaced sequence-controller figures in ${filePath}.`);

  // Slide title
  const oldTitle = '<span class="place-name -h5" data-v-7eb8a498><span string="split" string-split="char" data-v-7eb8a498>Shree Bramhand</span></span>';
  const newTitle = '<span class="place-name -h5" data-v-7eb8a498><span string="split" string-split="char" data-v-7eb8a498>Living Room</span></span>';
  if (!html.includes(oldTitle)) {
    console.error(`ERROR: oldTitle not found in ${filePath}!`);
    process.exit(1);
  }
  html = html.replace(oldTitle, newTitle);
  console.log(`Replaced active title in ${filePath}.`);

  // Counter
  const oldCounter = '<div class="order -h5" data-v-7eb8a498><span data-v-7eb8a498><span data-v-7eb8a498>1</span><span data-v-7eb8a498>/6</span></span></div>';
  const newCounter = '<div class="order -h5" data-v-7eb8a498><span data-v-7eb8a498><span data-v-7eb8a498>1</span><span data-v-7eb8a498>/7</span></span></div>';
  if (!html.includes(oldCounter)) {
    console.error(`ERROR: oldCounter not found in ${filePath}!`);
    process.exit(1);
  }
  html = html.replace(oldCounter, newCounter);
  console.log(`Replaced counter in ${filePath}.`);

  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`Saved updated HTML: ${filePath}`);
}

updateHtmlFile('d:/Shreeyogweb/public/index.html');
if (fs.existsSync('d:/Shreeyogweb/pages/index.html')) {
  updateHtmlFile('d:/Shreeyogweb/pages/index.html');
}

console.log('--- ALL UPDATES COMPLETED SUCCESSFULLY ---');
