const fs = require('fs');

const d = fs.readFileSync('public/_nuxt/default.ea02c3da.js', 'utf8');

const tIdx = d.indexOf('-t-transition');
console.log(d.substring(tIdx - 400, tIdx + 1200));
