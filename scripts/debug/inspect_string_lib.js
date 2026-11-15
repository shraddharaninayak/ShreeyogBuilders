const fs = require('fs');
const js = fs.readFileSync('d:/Shreeyogweb/public/_nuxt/index.d0184b9b.js', 'utf8');

const matches = [];
let pos = 0;
while (true) {
  const idx = js.indexOf('places-sequencer[50]', pos);
  if (idx === -1) break;
  matches.push(idx);
  pos = idx + 1;
}

console.log('Matches for places-sequencer[50]:', matches);
for (const idx of matches) {
  console.log(js.substring(idx - 100, idx + 400));
}
