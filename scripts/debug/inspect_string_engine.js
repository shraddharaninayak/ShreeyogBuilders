const fs = require('fs');

const entry = fs.readFileSync('references/obsidian_original/obsidianassembly.com/_nuxt/entry.6ece3b7b.js', 'utf8');

console.log(entry.substring(197000, 203000));
