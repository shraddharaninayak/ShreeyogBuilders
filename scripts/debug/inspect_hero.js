const fs = require('fs');

const html = fs.readFileSync('public/index.html', 'utf-8');
const idx = html.indexOf('c-welcome');
console.log('c-welcome first match:', idx);

// Find all occurrences
let pos = 0;
while (true) {
  const found = html.indexOf('c-welcome', pos);
  if (found === -1) break;
  console.log('Occurrence at', found, 'Context:', html.substring(Math.max(0, found - 30), Math.min(html.length, found + 80)));
  pos = found + 1;
}
