const fs = require('fs');

const js = fs.readFileSync('public/_nuxt/index.d0184b9b.js', 'utf8');
const idx = js.indexOf('st=G({__name:"Places"');
console.log(js.substring(idx + 1500, idx + 4000));
