const fs = require('fs');

const orig = fs.readFileSync('scripts/debug/orig_places_snippet.js', 'utf8');

const idx = orig.indexOf('"image-src":tt');
console.log(orig.substring(idx - 600, idx));
