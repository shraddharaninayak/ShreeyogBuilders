const fs = require('fs');
const origJs = fs.readFileSync('references/obsidian_original/obsidianassembly.com/_nuxt/index.d0184b9b.js', 'utf8');
const currJs = fs.readFileSync('public/_nuxt/index.d0184b9b.js', 'utf8');

const origObjIdx = origJs.indexOf('c-objects');
console.log('--- Orig c-objects template (first 1200 chars) ---');
console.log(origJs.slice(origObjIdx, origObjIdx + 1200));

const currObjIdx = currJs.indexOf('c-objects');
console.log('\n--- Curr c-objects template (first 1200 chars) ---');
console.log(currJs.slice(currObjIdx, currObjIdx + 1200));
