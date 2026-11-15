const fs = require('fs');
const entry = fs.readFileSync('public/_nuxt/entry.6ece3b7b.js', 'utf8');

const idx = 260900;
console.log(entry.slice(idx, idx + 1200));
