const fs = require('fs');
const js = fs.readFileSync('public/_nuxt/index.d0184b9b.js', 'utf8');

const idx = js.indexOf('__name:"Objects"');
console.log(js.slice(idx + 2600, idx + 4000));
