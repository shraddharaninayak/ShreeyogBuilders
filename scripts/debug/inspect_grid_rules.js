const fs = require('fs');
const css = fs.readFileSync('references/obsidian_original/obsidianassembly.com/_nuxt/index.a596e4a8.css', 'utf8');

// Search for sticky-container-1, sticky-container-2, sequence, and .-w
const rules = css.match(/[^{}]*\{[^}]*\}/g) || [];
for (const r of rules) {
  if (r.includes('c-objects') && (r.includes('sequence') || r.includes('sticky-container') || r.includes('grid-row') || r.includes('--rows') || r.includes('--top') || r.includes('--height'))) {
    console.log(r.trim());
  }
}
