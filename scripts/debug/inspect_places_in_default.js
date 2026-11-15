const fs = require('fs');

const d = fs.readFileSync('public/_nuxt/default.ea02c3da.js', 'utf8');

let pos = 0;
while (true) {
  const idx = d.indexOf('places', pos);
  if (idx === -1) break;
  console.log('--- Found places at', idx, '---');
  console.log(d.substring(Math.max(0, idx - 80), Math.min(d.length, idx + 100)));
  pos = idx + 6;
}
