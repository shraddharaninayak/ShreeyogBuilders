const fs = require('fs');
const entry = fs.readFileSync('public/_nuxt/entry.6ece3b7b.js', 'utf8');

let idx = 0;
while ((idx = entry.indexOf('directive', idx)) !== -1) {
  console.log('directive at ' + idx + ': ' + entry.slice(idx - 20, idx + 100));
  idx += 10;
}
