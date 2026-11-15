const fs = require('fs');
const origJs = fs.readFileSync('references/obsidian_original/obsidianassembly.com/_nuxt/index.d0184b9b.js', 'utf8');
const currJs = fs.readFileSync('public/_nuxt/index.d0184b9b.js', 'utf8');

console.log('Orig around 27330:');
console.log(origJs.slice(27280, 27380));

console.log('\nCurr around 27330:');
console.log(currJs.slice(27280, 27380));
