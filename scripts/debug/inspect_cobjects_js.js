const fs = require('fs');
const origJs = fs.readFileSync('references/obsidian_original/obsidianassembly.com/_nuxt/index.d0184b9b.js', 'utf8');
const currJs = fs.readFileSync('public/_nuxt/index.d0184b9b.js', 'utf8');

// Find where c-objects begins in currJs
const currObjIdx = currJs.indexOf('c-objects');
const origObjIdx = origJs.indexOf('c-objects');
console.log('Orig c-objects offset:', origObjIdx);
console.log('Curr c-objects offset:', currObjIdx);

console.log('Orig around c-objects:');
console.log(origJs.slice(origObjIdx - 100, origObjIdx + 300));

console.log('\nCurr around c-objects:');
console.log(currJs.slice(currObjIdx - 100, currObjIdx + 300));
