const fs = require('fs');
const origJs = fs.readFileSync('references/obsidian_original/obsidianassembly.com/_nuxt/index.d0184b9b.js', 'utf8');
const currJs = fs.readFileSync('public/_nuxt/index.d0184b9b.js', 'utf8');

const origPlacesStart = origJs.indexOf('places-sequencer[3]');
const origPlacesEnd = origJs.indexOf('c-objects');

console.log('Orig c-places snippet:');
console.log('Start:', origPlacesStart, 'End:', origPlacesEnd);

const currPlacesStart = currJs.indexOf('places-sequencer[0]');
const currPlacesEnd = currJs.indexOf('c-objects');
console.log('Curr c-places snippet:');
console.log('Start:', currPlacesStart, 'End:', currPlacesEnd);
