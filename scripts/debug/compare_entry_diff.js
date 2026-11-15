const fs = require('fs');

const orig = fs.readFileSync('public/_nuxt/entry.6ece3b7b.js.orig_bak', 'utf8');
const curr = fs.readFileSync('public/_nuxt/entry.6ece3b7b.js', 'utf8');

console.log('Orig length:', orig.length);
console.log('Curr length:', curr.length);

// Find differences
let diffs = [];
let i = 0, j = 0;
while (i < orig.length && j < curr.length) {
  if (orig[i] !== curr[j]) {
    // found mismatch
    const origSnippet = orig.substring(Math.max(0, i - 30), Math.min(orig.length, i + 100));
    const currSnippet = curr.substring(Math.max(0, j - 30), Math.min(curr.length, j + 100));
    console.log('--- Diff at orig:', i, 'curr:', j, '---');
    console.log('Orig:', origSnippet);
    console.log('Curr:', currSnippet);
    break;
  }
  i++;
  j++;
}
