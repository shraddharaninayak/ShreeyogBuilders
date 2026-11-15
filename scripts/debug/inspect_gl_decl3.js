const fs = require('fs');

const orig = fs.readFileSync('scripts/debug/orig_places_snippet.js', 'utf8');

const idx = orig.indexOf('c-places');
console.log('c-places found at:', idx);
console.log(orig.substring(idx - 200, idx + 200));
