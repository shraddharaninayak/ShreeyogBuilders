const fs = require('fs');

const d = fs.readFileSync('public/_nuxt/default.ea02c3da.js', 'utf8');

console.log(d.substring(d.length - 2000));
