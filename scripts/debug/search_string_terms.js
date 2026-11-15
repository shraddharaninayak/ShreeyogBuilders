const fs = require('fs');
const code = fs.readFileSync('public/_nuxt/entry.6ece3b7b.js', 'utf8');

['string-id', 'string-copy-from', 'string="progress"', 'objectManager', 'mirrorObjects'].forEach(term => {
  let idx = code.indexOf(term);
  console.log(`Term "${term}":`, idx);
  if (idx !== -1) {
    console.log(code.substring(Math.max(0, idx - 100), Math.min(code.length, idx + 200)));
  }
});
