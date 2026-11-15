const fs = require('fs');

const orig = fs.readFileSync('scripts/debug/orig_places_snippet.js', 'utf8');

const idx = orig.indexOf('u[3]||(u[3]=s("div"');
console.log(orig.substring(idx - 600, idx));
