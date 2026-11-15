const fs = require('fs');
const origJs = fs.readFileSync('references/obsidian_original/obsidianassembly.com/_nuxt/index.d0184b9b.js', 'utf8');

const idx = origJs.indexOf('const a=J');
console.log('Context of const a=J:', origJs.slice(idx - 200, idx + 100));

// find definition of J
const re = /\bJ\s*=[^,;]+[,;]/g;
let m;
while ((m = re.exec(origJs)) !== null) {
  if (m.index < idx) {
    console.log('J assignment at', m.index, ':', m[0]);
  }
}
