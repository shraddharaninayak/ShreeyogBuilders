const fs = require('fs');
const entry = fs.readFileSync('public/_nuxt/entry.6ece3b7b.js', 'utf8');

let pos = 0;
while ((pos = entry.indexOf('lazy', pos)) !== -1) {
  console.log('Match at', pos, ':', entry.slice(Math.max(0, pos - 60), pos + 120));
  pos += 100;
}
