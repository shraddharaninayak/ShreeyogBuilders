const fs = require('fs');

const js = fs.readFileSync('d:/Shreeyogweb/public/_nuxt/places.b37ae0d8.js', 'utf8');
console.log('Top 1500 chars of places.b37ae0d8.js:\n', js.substring(0, 1500));
