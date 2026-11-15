const fs = require('fs');
const orig = fs.readFileSync('scripts/debug/orig_objects.js', 'utf8');
const our = fs.readFileSync('scripts/debug/our_objects.js', 'utf8');

let i = 0, count = 0;
while (i < orig.length && i < our.length) {
  if (orig[i] !== our[i]) {
    count++;
    console.log(`Diff ${count} at ${i}:`);
    console.log('Orig:', JSON.stringify(orig.slice(i, i + 60)));
    console.log('Our :', JSON.stringify(our.slice(i, i + 60)));
    // skip to next identical character block of 10 chars
    let matchFound = false;
    for (let j = i + 1; j < orig.length - 10; j++) {
      const probe = orig.slice(j, j + 10);
      const ourPos = our.indexOf(probe, i);
      if (ourPos !== -1) {
        i = ourPos; // advance
        matchFound = true;
        break;
      }
    }
    if (!matchFound) break;
  } else {
    i++;
  }
}
console.log('Total diff sections:', count);
