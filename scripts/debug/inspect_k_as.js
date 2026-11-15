const fs = require('fs');
const c = fs.readFileSync('public/_nuxt/entry.6ece3b7b.js', 'utf8');

const idx = c.indexOf('BaseImage');
console.log('BaseImage in entry.js:', idx);
// Find what is exported as k:
const m = c.match(/export\s*\{[^}]*\bk as\b[^}]*\}/);
console.log('export with k as:', m ? m[0] : 'not found');
