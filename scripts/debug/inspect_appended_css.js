const fs = require('fs');

const orig = fs.readFileSync('references/obsidian_original/obsidianassembly.com/_nuxt/index.a596e4a8.css', 'utf8');
const pub = fs.readFileSync('public/_nuxt/index.a596e4a8.css', 'utf8');

const appended = pub.substring(orig.length);
console.log('--- ALL APPENDED CSS IN index.a596e4a8.css ---');
console.log(appended);
