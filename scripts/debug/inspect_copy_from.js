const fs = require('fs');
const entry = fs.readFileSync('public/_nuxt/entry.6ece3b7b.js', 'utf8');

let idx = 0;
while ((idx = entry.indexOf('string-copy-from', idx)) !== -1) {
  console.log('Match at ' + idx + ':');
  console.log(entry.slice(Math.max(0, idx - 100), idx + 300));
  idx += 10;
}
