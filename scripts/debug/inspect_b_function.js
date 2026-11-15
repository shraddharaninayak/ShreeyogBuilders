const fs = require('fs');

const d = fs.readFileSync('public/_nuxt/default.ea02c3da.js', 'utf8');

const bIdx = d.indexOf('const B=()=>{');
console.log(d.substring(bIdx, bIdx + 600));
