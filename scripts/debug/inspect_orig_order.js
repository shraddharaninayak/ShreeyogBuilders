const fs = require('fs');
const orig = fs.readFileSync('public/_nuxt/index.d0184b9b.js.bak', 'utf8');
const idx = orig.lastIndexOf('main",Jt,[');
if (idx !== -1) {
  console.log(orig.substring(idx - 150, idx + 250));
}
