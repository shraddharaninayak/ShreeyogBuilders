const fs = require('fs');
const origCss = fs.readFileSync('references/obsidian_original/obsidianassembly.com/_nuxt/index.a596e4a8.css', 'utf8');

// Find all occurrences of -sequence-cards
let idx = 0;
while ((idx = origCss.indexOf('-sequence-cards', idx)) !== -1) {
  console.log('--- -sequence-cards at', idx, '---');
  console.log(origCss.slice(Math.max(0, idx - 100), idx + 250));
  idx += 15;
}

console.log('=== sequence in origCss ===');
idx = 0;
while ((idx = origCss.indexOf('.sequence', idx)) !== -1) {
  console.log('--- .sequence at', idx, '---');
  console.log(origCss.slice(Math.max(0, idx - 50), idx + 250));
  idx += 9;
}
