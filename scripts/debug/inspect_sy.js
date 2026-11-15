const fs = require('fs');
const entry = fs.readFileSync('public/_nuxt/entry.6ece3b7b.js', 'utf8');

const idx = entry.indexOf('new Sy(');
console.log(entry.slice(idx - 300, idx + 100));

// Find definition of Sy
const syDef = entry.lastIndexOf('class Sy', idx);
console.log('Sy class:');
console.log(entry.slice(syDef, syDef + 600));
