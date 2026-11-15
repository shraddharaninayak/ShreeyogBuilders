const fs = require('fs');

const origCss = fs.readFileSync('references/obsidian_original/obsidianassembly.com/_nuxt/index.a596e4a8.css', 'utf8');

const matches = [...origCss.matchAll(/\.c-objects[^{]*\{[^}]*\}/g)];
console.log('Total rules matching .c-objects:', matches.length);
matches.forEach(m => console.log(m[0]));
