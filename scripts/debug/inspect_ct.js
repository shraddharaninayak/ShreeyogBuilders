const fs = require('fs');
const origJs = fs.readFileSync('references/obsidian_original/obsidianassembly.com/_nuxt/index.d0184b9b.js', 'utf8');
const currJs = fs.readFileSync('public/_nuxt/index.d0184b9b.js', 'utf8');

console.log('Orig ct definition:');
const origCt = origJs.indexOf('ct=');
console.log(origJs.slice(origCt - 20, origCt + 100));

console.log('Curr ct definition:');
const currCt = currJs.indexOf('ct=');
console.log(currJs.slice(currCt - 20, currCt + 100));
