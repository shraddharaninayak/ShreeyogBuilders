const fs = require('fs');
const js = fs.readFileSync('references/obsidian_original/obsidianassembly.com/_nuxt/entry.6ece3b7b.js', 'utf8');

// Search for -scrolled, -hidden, header, etc.
let idx = 0;
while ((idx = js.indexOf('.-scrolled', idx)) !== -1) {
  console.log('.-scrolled at', idx, ':', js.slice(Math.max(0, idx - 40), idx + 80));
  idx += 10;
}
idx = 0;
while ((idx = js.indexOf('-scrolled', idx)) !== -1) {
  console.log('-scrolled at', idx, ':', js.slice(Math.max(0, idx - 40), idx + 80));
  idx += 9;
}
