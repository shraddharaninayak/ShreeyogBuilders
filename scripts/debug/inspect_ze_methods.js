const fs = require('fs');
const c = fs.readFileSync('public/_nuxt/entry.6ece3b7b.js', 'utf8');
let idx = c.indexOf('ze=class');
const zeCode = c.substring(idx, idx + 15000);
console.log(zeCode.substring(0, 3000));
