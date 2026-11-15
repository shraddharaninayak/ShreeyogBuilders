const fs = require('fs');

console.log('--- Applying The Art of Living Updates ---');

// 1. Update index.a596e4a8.css with object-fit: contain rule
const cssPath = 'd:/Shreeyogweb/public/_nuxt/index.a596e4a8.css';
let css = fs.readFileSync(cssPath, 'utf8');

const cssRule = `
/* --- Shreeyog The Art of Living Building Cards --- */
.c-objects .-w .sequence .object-wrapper figure {
  aspect-ratio: 1200 / 1600 !important;
  border-radius: .4rem !important;
  overflow: hidden !important;
}
.c-objects .-w .sequence .object-wrapper figure img {
  width: 100% !important;
  height: 100% !important;
  object-fit: contain !important;
}
`;

if (!css.includes('Shreeyog The Art of Living Building Cards')) {
  css += cssRule;
  fs.writeFileSync(cssPath, css, 'utf8');
  console.log('Added CSS rule to index.a596e4a8.css');
} else {
  console.log('CSS rule already present in index.a596e4a8.css');
}

// 2. Update alt attributes in public/index.html and pages/index.html
function updateHtml(filePath) {
  let html = fs.readFileSync(filePath, 'utf8');

  // Replace each object-X.webp alt attribute in c-objects
  const replacements = [
    {
      find: 'string-lazy="/images/objects-init/object-4.webp" alt="Shreeyog Builders & Land Developers"',
      replace: 'string-lazy="/images/objects-init/object-4.webp" alt="Tanvi Residency - Shreeyog Builders & Land Developers"'
    },
    {
      find: 'string-lazy="/images/objects-init/object-1.webp" alt="Shreeyog Builders & Land Developers"',
      replace: 'string-lazy="/images/objects-init/object-1.webp" alt="Aerial Community View - Shreeyog Builders & Land Developers"'
    },
    {
      find: 'string-lazy="/images/objects-init/object-2.webp" alt="Shreeyog Builders & Land Developers"',
      replace: 'string-lazy="/images/objects-init/object-2.webp" alt="Modern Luxury Residences - Shreeyog Builders & Land Developers"'
    },
    {
      find: 'string-lazy="/images/objects-init/object-3.webp" alt="Shreeyog Builders & Land Developers"',
      replace: 'string-lazy="/images/objects-init/object-3.webp" alt="Contemporary Avenue - Shreeyog Builders & Land Developers"'
    }
  ];

  let count = 0;
  for (const r of replacements) {
    if (html.includes(r.find)) {
      html = html.replace(r.find, r.replace);
      count++;
    }
  }

  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`Updated ${count} alt attributes in ${filePath}`);
}

updateHtml('d:/Shreeyogweb/public/index.html');
if (fs.existsSync('d:/Shreeyogweb/pages/index.html')) {
  updateHtml('d:/Shreeyogweb/pages/index.html');
}

console.log('--- The Art of Living Updates Complete ---');
