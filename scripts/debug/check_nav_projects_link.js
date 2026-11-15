const fs = require('fs');

const html = fs.readFileSync('d:/Shreeyogweb/public/index.html', 'utf8');

const navIdx = html.indexOf('<nav');
console.log('--- Nav in index.html ---');
let pos = 0;
while (true) {
  const pIdx = html.indexOf('Projects', pos);
  if (pIdx === -1) break;
  console.log(html.substring(Math.max(0, pIdx - 150), Math.min(html.length, pIdx + 150)));
  console.log('---');
  pos = pIdx + 1;
}
