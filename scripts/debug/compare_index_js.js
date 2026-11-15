const fs = require('fs');

const orig = fs.readFileSync('public/_nuxt/index.d0184b9b.js.bak', 'utf8');
const curr = fs.readFileSync('public/_nuxt/index.d0184b9b.js', 'utf8');

// Find differences
const diffs = [];
let i = 0;
while (i < Math.max(orig.length, curr.length)) {
  if (orig[i] !== curr[i]) {
    const start = Math.max(0, i - 30);
    const origSnippet = orig.substring(start, start + 120);
    const currSnippet = curr.substring(start, start + 120);
    diffs.push({ i, origSnippet, currSnippet });
    // advance i
    i += 100;
  } else {
    i++;
  }
}

console.log('Total diff regions:', diffs.length);
diffs.forEach((d, idx) => {
  console.log(`\n--- Diff ${idx+1} at index ${d.i} ---`);
  console.log('ORIG:', d.origSnippet);
  console.log('CURR:', d.currSnippet);
});
