const fs = require('fs');

const orig = fs.readFileSync('public/_nuxt/entry.6ece3b7b.js.orig_bak', 'utf8');
const curr = fs.readFileSync('public/_nuxt/entry.6ece3b7b.js', 'utf8');

// We know the 3 patches from patch_entry_js:
// 1. ku class
// 2. wb class
// 3. Ty.onFrame
console.log('Patch 1 in curr?', curr.includes('ku=class extends ze{enterObject'));
console.log('Patch 2 in curr?', curr.includes('wb=class extends ku{enterObject'));
console.log('Patch 3 in curr?', curr.includes('this.onCalcUpdate();return}'));
