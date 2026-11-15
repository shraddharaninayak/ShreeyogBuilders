const fs = require('fs');
const js = fs.readFileSync('d:/Shreeyogweb/public/_nuxt/index.d0184b9b.js', 'utf8');

const idx = 50015;
console.log('--- CONTEXT AROUND 50015 in JS ---');
console.log(js.substring(Math.max(0, idx - 1500), Math.min(js.length, idx + 2000)));
