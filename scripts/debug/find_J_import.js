const fs = require('fs');
const origJs = fs.readFileSync('references/obsidian_original/obsidianassembly.com/_nuxt/index.d0184b9b.js', 'utf8');

// Find all declarations of J
let idx = 0;
while ((idx = origJs.indexOf('J', idx)) !== -1) {
  const snippet = origJs.slice(Math.max(0, idx - 10), idx + 20);
  if (snippet.includes('let J') || snippet.includes('var J') || snippet.includes('const J') || snippet.includes(',J=') || snippet.includes('{J') || snippet.includes('J,')) {
    console.log('Match at ' + idx + ': ' + snippet);
  }
  idx += 1;
}
