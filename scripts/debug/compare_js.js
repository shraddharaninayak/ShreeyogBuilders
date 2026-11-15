const fs = require('fs');
const origJs = fs.readFileSync('references/obsidian_original/obsidianassembly.com/_nuxt/index.d0184b9b.js', 'utf8');
const currJs = fs.readFileSync('public/_nuxt/index.d0184b9b.js', 'utf8');

console.log('Orig JS length:', origJs.length);
console.log('Curr JS length:', currJs.length);

// Let's find occurrences of objects in origJs and currJs
function findOccurrences(js, term) {
  let count = 0;
  let idx = 0;
  while ((idx = js.indexOf(term, idx)) !== -1) {
    count++;
    idx += term.length;
  }
  return count;
}

console.log('Orig objects-init:', findOccurrences(origJs, 'objects-init'));
console.log('Curr objects-init:', findOccurrences(currJs, 'objects-init'));

console.log('Orig c-objects:', findOccurrences(origJs, 'c-objects'));
console.log('Curr c-objects:', findOccurrences(currJs, 'c-objects'));
