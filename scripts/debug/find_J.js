const fs = require('fs');
const js = fs.readFileSync('public/_nuxt/index.d0184b9b.js', 'utf8');

// Find where J is defined or imported
const origJs = fs.readFileSync('references/obsidian_original/obsidianassembly.com/_nuxt/index.d0184b9b.js', 'utf8');

console.log('Orig J occurrences:');
let idx = 0;
while ((idx = origJs.indexOf('J=', idx)) !== -1) {
  console.log(origJs.slice(Math.max(0, idx - 50), idx + 100));
  idx += 5;
}
