const fs = require('fs');
const css = fs.readFileSync('references/obsidian_original/obsidianassembly.com/_nuxt/default.dc95e376.css', 'utf8');

let idx = 0;
while ((idx = css.indexOf('.button', idx)) !== -1) {
  console.log('at', idx, ':', css.slice(Math.max(0, idx - 20), idx + 100));
  idx += 7;
}
