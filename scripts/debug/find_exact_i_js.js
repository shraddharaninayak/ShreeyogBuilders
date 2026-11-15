const fs = require('fs');

const js = fs.readFileSync('obsidianassembly.com/_nuxt/index.d0184b9b.js', 'utf8');
const idx = js.indexOf('class:"i i-1"');
console.log(js.slice(idx - 100, idx + 1400));
