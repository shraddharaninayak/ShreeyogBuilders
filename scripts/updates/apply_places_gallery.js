const fs = require('fs');
const path = require('path');

const basePath = 'D:/Shreeyogweb/obsidianassembly.com';

// 1. Update _nuxt/index.d0184b9b.js
const jsPath = path.join(basePath, '_nuxt/index.d0184b9b.js');
let js = fs.readFileSync(jsPath, 'utf8');

const jsReplacements = [
  ['src:"/images/offices/2.webp"', 'src:"/images/shreeyog/projects/nisarg.webp"'],
  ['src:"/images/offices/3.webp"', 'src:"/images/shreeyog/projects/safalya-angle.webp"'],
  ['src:"/images/offices/4.webp"', 'src:"/images/shreeyog/projects/residential-complex.webp"'],
  ['src:"/images/offices/5.webp"', 'src:"/images/shreeyog/projects/shakuntal.webp"'],
  ['src:"/images/offices/6.webp"', 'src:"/images/shreeyog/projects/chintan.webp"'],
  ['src:"/images/offices/7.webp"', 'src:"/images/shreeyog/projects/safalya-tower.webp"']
];

for (const [from, to] of jsReplacements) {
  if (js.includes(from)) {
    js = js.replace(from, to);
    console.log(`✓ JS replaced ${from} -> ${to}`);
  } else {
    console.warn(`Warning: ${from} not found in JS`);
  }
}

fs.writeFileSync(jsPath, js, 'utf8');
console.log('Saved updated index.d0184b9b.js');

// 2. Update obsidianassembly.com/index.html
const htmlPath = path.join(basePath, 'index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

const htmlReplacements = [
  [
    'string-lazy="/images/offices/2.webp" alt="Shree Bramhand - Nashik"',
    'string-lazy="/images/shreeyog/projects/nisarg.webp" src="/images/shreeyog/projects/nisarg.webp" alt="Shree Nisarg - Gangapur Road, Nashik"'
  ],
  [
    'string-lazy="/images/offices/3.webp" alt="Shree Pandurang - Nashik"',
    'string-lazy="/images/shreeyog/projects/safalya-angle.webp" src="/images/shreeyog/projects/safalya-angle.webp" alt="Shree Safalya - Luxury High-Rise, Nashik"'
  ],
  [
    'string-lazy="/images/offices/4.webp" alt="Shree Venkatesh - Nashik"',
    'string-lazy="/images/shreeyog/projects/residential-complex.webp" src="/images/shreeyog/projects/residential-complex.webp" alt="Shreeyog Residential Township, Nashik"'
  ],
  [
    'string-lazy="/images/offices/5.webp" alt="Shree Neelkanth - Nashik"',
    'string-lazy="/images/shreeyog/projects/shakuntal.webp" src="/images/shreeyog/projects/shakuntal.webp" alt="Shree Shakuntal - Indira Nagar, Nashik"'
  ],
  [
    'string-lazy="/images/offices/6.webp" alt="Shree Nandan - Nashik"',
    'string-lazy="/images/shreeyog/projects/chintan.webp" src="/images/shreeyog/projects/chintan.webp" alt="Shree Chintan - 2 BHK Residences, Nashik"'
  ],
  [
    'string-lazy="/images/offices/7.webp" alt="Shree Malhar - Nashik"',
    'string-lazy="/images/shreeyog/projects/safalya-tower.webp" src="/images/shreeyog/projects/safalya-tower.webp" alt="Shree Safalya - Architectural Tower, Nashik"'
  ]
];

for (const [from, to] of htmlReplacements) {
  if (html.includes(from)) {
    html = html.replace(from, to);
    console.log(`✓ HTML replaced ${from.slice(0, 35)}... -> ${to.slice(0, 45)}...`);
  } else {
    console.warn(`Warning: ${from} not found in HTML`);
  }
}

// 3. Add styling for outer floating gallery images in .c-places
const placesCustomCss = `
/* Places outer floating gallery images - full visibility, no crop, rounded corners */
.c-places .places-story .-w .sticky-container .-gc .i[data-v-7eb8a498] {
  border-radius: 0.5rem !important;
  overflow: hidden !important;
  background-color: #161514 !important;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5) !important;
  transition: transform 0.6s var(--f-cubic), box-shadow 0.6s var(--f-cubic) !important;
}
.c-places .places-story .-w .sticky-container .-gc .i[data-v-7eb8a498]:hover {
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.7) !important;
}
.c-places .places-story .-w .sticky-container .-gc .i[data-v-7eb8a498] img {
  object-fit: contain !important;
  width: 100% !important;
  height: 100% !important;
  display: block !important;
  border-radius: inherit !important;
}
`;

if (html.includes('/* Places outer floating gallery images')) {
  console.log('Places CSS already injected, skipping CSS append');
} else {
  html = html.replace('</style>\n</head>', `${placesCustomCss}\n</style>\n</head>`);
  console.log('✓ Injected placesCustomCss into index.html');
}

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Saved updated index.html');
