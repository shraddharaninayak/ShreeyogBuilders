const fs = require('fs');
const origJs = fs.readFileSync('references/obsidian_original/obsidianassembly.com/_nuxt/index.d0184b9b.js', 'utf8');
const currJs = fs.readFileSync('public/_nuxt/index.d0184b9b.js', 'utf8');

const origObjIdx = origJs.indexOf('c-objects');
console.log('--- Orig setup of c-objects ---');
console.log(origJs.slice(origObjIdx - 1500, origObjIdx));

const currObjIdx = currJs.indexOf('c-objects');
console.log('--- Curr setup of c-objects ---');
console.log(currJs.slice(currObjIdx - 1500, currObjIdx));
