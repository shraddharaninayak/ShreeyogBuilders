const fs = require('fs');
const code = fs.readFileSync('public/_nuxt/entry.6ece3b7b.js', 'utf8');

// Find where "progress" or "welcome" is handled
let idx = 0;
while ((idx = code.indexOf('"welcome"', idx)) !== -1) {
  console.log('Match at', idx, ':\n', code.substring(Math.max(0, idx - 150), Math.min(code.length, idx + 150)));
  idx += 9;
}
