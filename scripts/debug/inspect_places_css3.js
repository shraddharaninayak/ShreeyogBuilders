const fs = require('fs');
const content = fs.readFileSync('d:/Shreeyogweb/public/_nuxt/index.a596e4a8.css', 'utf8');

const matches = [];
let pos = 0;
while (true) {
  const idx = content.indexOf('.c-places', pos);
  if (idx === -1) break;
  matches.push(idx);
  pos = idx + 1;
}

console.log('Matches count:', matches.length);
for (const idx of matches) {
  console.log('--- Match at ' + idx + ' ---');
  console.log(content.substring(idx, idx + 600));
}
