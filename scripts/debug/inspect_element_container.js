const fs = require('fs');
const entry = fs.readFileSync('public/_nuxt/entry.6ece3b7b.js', 'utf8');

const idx = entry.indexOf('elementContainer');
console.log(entry.slice(idx - 100, idx + 400));
