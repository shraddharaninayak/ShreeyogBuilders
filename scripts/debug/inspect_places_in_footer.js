const fs = require('fs');

const f = fs.readFileSync('public/_nuxt/MainFooter.a208a2b7.js', 'utf8');

let pos = 0;
while (true) {
  const idx = f.indexOf('places', pos);
  if (idx === -1) break;
  console.log('--- Found places in MainFooter at', idx, '---');
  console.log(f.substring(Math.max(0, idx - 80), Math.min(f.length, idx + 100)));
  pos = idx + 6;
}
