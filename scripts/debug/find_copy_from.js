const fs = require('fs');
const c = fs.readFileSync('public/_nuxt/entry.6ece3b7b.js', 'utf8');

let idx = 0;
while ((idx = c.indexOf('string-copy-from', idx)) !== -1) {
  console.log('Match at', idx, ':', c.substring(idx - 60, idx + 180));
  idx += 16;
}
