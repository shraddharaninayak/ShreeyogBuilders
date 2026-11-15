const fs = require('fs');
const c = fs.readFileSync('public/_nuxt/entry.6ece3b7b.js', 'utf8');
let idx = 0;
while ((idx = c.indexOf('setProperty("progress', idx)) !== -1) {
  console.log('Found setProperty progress at', idx, c.substring(idx - 60, idx + 140));
  idx += 20;
}
