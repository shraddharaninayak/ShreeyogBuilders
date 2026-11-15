const fs = require('fs');

const bak = fs.readFileSync('public/_nuxt/places.b37ae0d8.js.bak', 'utf8');
console.log('Original imports in places.b37ae0d8.js.bak:');
console.log(bak.substring(0, 400));
