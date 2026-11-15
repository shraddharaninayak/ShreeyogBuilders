const fs = require('fs');

const entryJs = fs.readFileSync('obsidianassembly.com/_nuxt/entry.6ece3b7b.js', 'utf8');

// Find export name for createStaticVNode
const m = entryJs.match(/([a-zA-Z0-9_$]+)\s*as\s*createStaticVNode/);
console.log('Export as createStaticVNode:', m ? m[0] : 'not found');

// Or find function createStaticVNode
const idx = entryJs.indexOf('createStaticVNode');
if (idx !== -1) {
  console.log('createStaticVNode at', idx, entryJs.substring(idx - 100, idx + 200));
}
