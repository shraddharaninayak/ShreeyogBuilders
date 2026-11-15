const fs = require('fs');

const d = fs.readFileSync('public/_nuxt/default.ea02c3da.js', 'utf8');

let pos = 0;
while (true) {
  const idx = d.indexOf('Imagine', pos);
  if (idx === -1) break;
  console.log('Found Imagine in default.js at', idx, ':', d.substring(Math.max(0, idx - 50), Math.min(d.length, idx + 100)));
  pos = idx + 7;
}
