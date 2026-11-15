const fs = require('fs');
const origJs = fs.readFileSync('references/obsidian_original/obsidianassembly.com/_nuxt/index.d0184b9b.js', 'utf8');
const currJs = fs.readFileSync('public/_nuxt/index.d0184b9b.js', 'utf8');

console.log('Orig from 34877:', origJs.slice(34877, 35500));
console.log('\n--- Curr from 35443: ---');
console.log(currJs.slice(35443, 36000));
