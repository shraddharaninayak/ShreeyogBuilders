const fs = require('fs');

const content = fs.readFileSync('public/_nuxt/entry.6ece3b7b.js', 'utf8');

let pos = 0;
while (true) {
  const idx = content.indexOf('/places', pos);
  if (idx === -1) break;
  console.log('--- Found /places at index', idx, '---');
  console.log(content.substring(Math.max(0, idx - 150), Math.min(content.length, idx + 250)));
  pos = idx + 7;
}

pos = 0;
while (true) {
  const idx = content.indexOf('/projects', pos);
  if (idx === -1) break;
  console.log('--- Found /projects at index', idx, '---');
  console.log(content.substring(Math.max(0, idx - 150), Math.min(content.length, idx + 250)));
  pos = idx + 9;
}
