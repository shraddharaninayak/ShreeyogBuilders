const fs = require('fs');

const orig = fs.readFileSync('scripts/debug/orig_places_snippet.js', 'utf8');

const idx = orig.indexOf('Oe={class:"c-places"');
console.log(orig.substring(idx, idx + 4000));
