const fs = require('fs');
const entry = fs.readFileSync('public/_nuxt/entry.6ece3b7b.js', 'utf8');

let idx = 0;
while ((idx = entry.indexOf('linkMirror', idx)) !== -1) {
  console.log('Match at ' + idx + ':');
  console.log(entry.slice(Math.max(0, idx - 50), idx + 400));
  idx += 10;
}
