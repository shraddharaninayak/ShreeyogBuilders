const fs = require('fs');

const p = fs.readFileSync('public/projects/index.html', 'utf8');

let pos = 0;
while (true) {
  const idx = p.toLowerCase().indexOf('imagine', pos);
  if (idx === -1) break;
  console.log('Found imagine at', idx, ':', p.substring(Math.max(0, idx - 40), Math.min(p.length, idx + 80)));
  pos = idx + 7;
}
