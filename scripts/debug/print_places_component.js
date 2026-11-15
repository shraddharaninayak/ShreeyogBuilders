const fs = require('fs');

const js = fs.readFileSync('public/_nuxt/index.d0184b9b.js', 'utf8');
const idx = js.indexOf('c-places');
console.log(js.substring(idx, idx + 2500));
