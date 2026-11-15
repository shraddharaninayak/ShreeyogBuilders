const fs = require('fs');
const js = fs.readFileSync('obsidianassembly.com/_nuxt/about.551df348.js', 'utf8');

// Find words in js
const words = ['About', 'Shreeyog', 'Builders', 'Obsidian', 'Assembly'];
for (const w of words) {
  let count = 0;
  let idx = 0;
  while ((idx = js.indexOf(w, idx)) !== -1) {
    count++;
    idx += w.length;
  }
  console.log(`${w}: ${count} occurrences`);
}

const match = js.match(/line-1[\s\S]{1,200}/g);
if (match) {
  console.log('Matches with line-1:');
  match.forEach(m => console.log(m));
}
