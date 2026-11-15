const fs = require('fs');
const js = fs.readFileSync('references/obsidian_original/obsidianassembly.com/_nuxt/default.ea02c3da.js', 'utf8');

console.log(js.slice(7700, 10500));
