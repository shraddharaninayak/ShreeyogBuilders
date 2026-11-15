const fs = require('fs');

const idxJs = fs.readFileSync('obsidianassembly.com/_nuxt/index.d0184b9b.js', 'utf8');
const idx = idxJs.indexOf('createStaticVNode');
console.log('in index.js:', idx);
const m = idxJs.match(/import\{[^}]*\}from"\.\/entry\.6ece3b7b\.js"/);
console.log(m ? m[0].substring(0, 300) : 'none');

// Find where ae comes from in index.js
const m2 = idxJs.match(/([a-zA-Z0-9_$]+)\s*as\s*ae/);
console.log('ae alias:', m2 ? m2[0] : 'not found');
// Or check imports in index.js
const imports = idxJs.match(/import\{([^}]+)\}from"\.\/entry\.6ece3b7b\.js"/);
if (imports) {
  const parts = imports[1].split(',');
  console.log('imports from entry:', parts.filter(p => p.includes('ae')));
}
