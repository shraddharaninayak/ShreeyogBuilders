const fs = require('fs');

const js = fs.readFileSync('public/_nuxt/index.d0184b9b.js', 'utf8');

const matches = js.match(/\/images\/[a-zA-Z0-9_\-\.\/]+/g) || [];
const unique = [...new Set(matches)];

console.log('Total unique images referenced in index.js:', unique.length);
unique.forEach(img => {
  const filePath = 'public' + img;
  const exists = fs.existsSync(filePath);
  if (!exists) {
    console.log('MISSING:', img);
  }
});
