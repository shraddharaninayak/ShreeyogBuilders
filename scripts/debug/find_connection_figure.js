const fs = require('fs');

const orig = fs.readFileSync('public/_nuxt/index.d0184b9b.js.bak', 'utf8');
let idx = 0;
while ((idx = orig.indexOf('connection-figure', idx)) !== -1) {
  console.log('Match at', idx, ':', orig.substring(idx - 60, idx + 120));
  idx += 17;
}
