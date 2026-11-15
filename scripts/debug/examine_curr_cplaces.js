const fs = require('fs');
const currJs = fs.readFileSync('public/_nuxt/index.d0184b9b.js', 'utf8');
console.log(currJs.slice(31400, 32900));
