const fs = require('fs');

const p = fs.readFileSync('public/_nuxt/places.b37ae0d8.js', 'utf8');
console.log('places.b37ae0d8.js total length:', p.length);
console.log(p.substring(0, 1500));
console.log('--- END OF FILE ---');
console.log(p.substring(p.length - 1500));
