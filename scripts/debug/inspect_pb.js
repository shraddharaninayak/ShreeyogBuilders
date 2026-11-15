const fs = require('fs');
const entry = fs.readFileSync('public/_nuxt/entry.6ece3b7b.js', 'utf8');

const idx = entry.lastIndexOf('pb=', 261500);
console.log('pb definition:');
console.log(entry.slice(idx - 100, idx + 500));
