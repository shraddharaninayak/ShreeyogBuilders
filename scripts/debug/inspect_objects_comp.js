const fs = require('fs');
const code = fs.readFileSync('public/_nuxt/index.d0184b9b.js', 'utf8');

const idx = code.indexOf('__name:"Objects"');
if (idx !== -1) {
  console.log(code.substring(idx - 50, idx + 2500));
}
