const fs = require('fs');

const content = fs.readFileSync('public/_nuxt/entry.6ece3b7b.js', 'utf8');

let pos = 0;
while (true) {
  const idx = content.indexOf('as ae', pos);
  if (idx === -1) break;
  console.log('--- Found as ae at', idx, '---');
  console.log(content.substring(Math.max(0, idx - 50), Math.min(content.length, idx + 100)));
  pos = idx + 6;
}
