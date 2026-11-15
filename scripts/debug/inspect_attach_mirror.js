const fs = require('fs');
const entry = fs.readFileSync('public/_nuxt/entry.6ece3b7b.js', 'utf8');

const idx = entry.indexOf('attachMirrorToObject(e,t){');
console.log(entry.slice(idx, idx + 800));
