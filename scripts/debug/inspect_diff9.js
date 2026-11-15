const fs = require('fs');

const orig = fs.readFileSync('scripts/debug/orig_places_snippet.js', 'utf8');
const pub = fs.readFileSync('scripts/debug/pub_places_snippet.js', 'utf8');

console.log('Snippet around DIFF #9 in ORIG:');
console.log(orig.substring(1350, 1450));

console.log('Snippet around DIFF #9 in PUB:');
console.log(pub.substring(1350, 1450));
