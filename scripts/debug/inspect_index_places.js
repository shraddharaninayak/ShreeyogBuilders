const fs = require('fs');

const html = fs.readFileSync('public/index.html', 'utf8');

console.log('--- Matches for places in public/index.html ---');
let pos = 0;
while (true) {
  const idx = html.indexOf('places', pos);
  if (idx === -1) break;
  console.log(html.substring(Math.max(0, idx - 60), Math.min(html.length, idx + 100)));
  pos = idx + 6;
}
