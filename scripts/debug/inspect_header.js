const fs = require('fs');
const code = fs.readFileSync('public/_nuxt/default.ea02c3da.js', 'utf8');
const idx = code.indexOf('__name:"MainHeader"');
console.log('MainHeader at', idx);
console.log(code.substring(idx - 100, idx + 3500));
