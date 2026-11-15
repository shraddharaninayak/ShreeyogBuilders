const fs = require('fs');
const origJs = fs.readFileSync('references/obsidian_original/obsidianassembly.com/_nuxt/index.d0184b9b.js', 'utf8');
const currJs = fs.readFileSync('public/_nuxt/index.d0184b9b.js', 'utf8');

const origObjIdx = origJs.indexOf('c-objects');
console.log('--- Orig c-objects cards (offset +1200 to +3000) ---');
console.log(origJs.slice(origObjIdx + 1200, origObjIdx + 3000));

const currObjIdx = currJs.indexOf('c-objects');
console.log('\n--- Curr c-objects cards (offset +1200 to +3000) ---');
console.log(currJs.slice(currObjIdx + 1200, currObjIdx + 3000));
