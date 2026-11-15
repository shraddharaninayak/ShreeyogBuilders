const fs = require('fs');

const js = fs.readFileSync('public/_nuxt/entry.6ece3b7b.js', 'utf8');
let idx = 0;
while ((idx = js.indexOf('string-copy-from', idx)) !== -1) {
  console.log(`=== string-copy-from in entry.js at ${idx} ===`);
  console.log(js.slice(Math.max(0, idx - 100), Math.min(js.length, idx + 200)));
  idx += 10;
}
