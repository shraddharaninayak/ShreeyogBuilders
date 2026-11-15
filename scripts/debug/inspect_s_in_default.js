const fs = require('fs');

const d = fs.readFileSync('public/_nuxt/default.ea02c3da.js', 'utf8');

// Find declaration of S in setup
const matches = d.match(/const\s*\{[^}]*\}\s*=\s*[^;]+|const\s+[a-zA-Z0-9_$]+\s*=[^;]+/g);
// Let's find S in setup
const idx = d.indexOf('extraClass:"places"');
if (idx !== -1) {
  console.log(d.substring(idx - 400, idx + 200));
}
