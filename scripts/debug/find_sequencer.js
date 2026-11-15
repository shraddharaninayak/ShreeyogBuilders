const fs = require('fs');

const js = fs.readFileSync('obsidianassembly.com/_nuxt/index.d0184b9b.js', 'utf8');
const html = fs.readFileSync('obsidianassembly.com/index.html', 'utf8');

console.log('--- JS occurrences of places-sequencer ---');
let pos = 0;
while ((pos = js.indexOf('places-sequencer', pos)) !== -1) {
  console.log('JS at', pos, ':', js.slice(pos - 40, pos + 80));
  pos += 16;
}

console.log('--- HTML occurrences of places-sequencer ---');
pos = 0;
while ((pos = html.indexOf('places-sequencer', pos)) !== -1) {
  console.log('HTML at', pos, ':', html.slice(pos - 40, pos + 80));
  pos += 16;
}
