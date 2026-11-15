const fs = require('fs');

const orig = fs.readFileSync('references/obsidian_original/obsidianassembly.com/_nuxt/index.d0184b9b.js', 'utf8');
const pub = fs.readFileSync('public/_nuxt/index.d0184b9b.js', 'utf8');

// Find all differences by finding chunks
const diffs = [];
let i = 0, j = 0;
while (i < orig.length || j < pub.length) {
  if (orig[i] !== pub[j]) {
    // Find next synchronization point of at least 25 characters
    let found = false;
    for (let di = 0; di < 2000 && i + di < orig.length; di++) {
      const probe = orig.substring(i + di, i + di + 30);
      const posInPub = pub.indexOf(probe, j);
      if (posInPub !== -1 && posInPub - j < 5000) {
        diffs.push({
          origStart: i,
          pubStart: j,
          origSnippet: orig.substring(i, i + di),
          pubSnippet: pub.substring(j, posInPub)
        });
        i += di;
        j = posInPub;
        found = true;
        break;
      }
    }
    if (!found) {
      // jump forward
      diffs.push({
        origStart: i,
        pubStart: j,
        origSnippet: orig.substring(i, i + 100),
        pubSnippet: pub.substring(j, j + 100)
      });
      break;
    }
  } else {
    i++;
    j++;
  }
}

console.log('Total diff chunks found:', diffs.length);
diffs.forEach((d, idx) => {
  console.log(`\n=================== DIFF #${idx + 1} ===================`);
  console.log(`Orig [${d.origStart}]:`, d.origSnippet.substring(0, 300));
  console.log(`Pub  [${d.pubStart}]:`, d.pubSnippet.substring(0, 300));
});
