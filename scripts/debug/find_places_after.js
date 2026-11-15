const fs = require('fs');
const origJs = fs.readFileSync('references/obsidian_original/obsidianassembly.com/_nuxt/index.d0184b9b.js', 'utf8');
const currJs = fs.readFileSync('public/_nuxt/index.d0184b9b.js', 'utf8');

console.log('Orig c-places-after index:', origJs.indexOf('c-places-after'));
console.log('Curr c-places-after index:', currJs.indexOf('c-places-after'));
