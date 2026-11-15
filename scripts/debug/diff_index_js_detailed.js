const fs = require('fs');

const orig = fs.readFileSync('references/obsidian_original/obsidianassembly.com/_nuxt/index.d0184b9b.js', 'utf8');
const cur = fs.readFileSync('public/_nuxt/index.d0184b9b.js', 'utf8');

console.log('Orig length:', orig.length);
console.log('Cur length :', cur.length);

// Find each differing chunk
let i = 0, diffs = 0;
while (i < orig.length && i < cur.length) {
  if (orig[i] !== cur[i]) {
    diffs++;
    const oSnippet = orig.slice(i, i + 80);
    const cSnippet = cur.slice(i, i + 80);
    console.log(`\nDiff #${diffs} at char ${i}:`);
    console.log('  Orig:', JSON.stringify(oSnippet));
    console.log('  Cur :', JSON.stringify(cSnippet));

    // Find next common anchor of 25 characters
    let found = false;
    for (let len = 25; len >= 15; len--) {
      for (let j = i + 1; j < i + 500 && j < orig.length - len; j++) {
        const probe = orig.slice(j, j + len);
        const match = cur.indexOf(probe, i);
        if (match !== -1) {
          console.log(`  Resynced at Orig +${j - i}, Cur +${match - i}`);
          i = match; // sync cur
          found = true;
          break;
        }
      }
      if (found) break;
    }
    if (!found) {
      console.log('  Could not find resync within 500 chars, advancing 80 chars');
      i += 80;
    }
  } else {
    i++;
  }
}
console.log('\nTotal diffs:', diffs);
