const fs = require('fs');

const orig = fs.readFileSync('scripts/debug/orig_places_snippet.js', 'utf8');
const pub = fs.readFileSync('scripts/debug/pub_places_snippet.js', 'utf8');

// Find differences
let i = 0, j = 0;
while (i < orig.length && j < pub.length) {
  if (orig[i] !== pub[j]) {
    // find sync
    let sync = false;
    for (let di = 0; di < 2000 && i + di < orig.length; di++) {
      const p = orig.substring(i + di, i + di + 25);
      const pos = pub.indexOf(p, j);
      if (pos !== -1 && pos - j < 3000) {
        console.log('\n--- DIFF ---');
        console.log('ORIG:', JSON.stringify(orig.substring(i, i + di)));
        console.log('PUB: ', JSON.stringify(pub.substring(j, pos)));
        i += di;
        j = pos;
        sync = true;
        break;
      }
    }
    if (!sync) {
      console.log('No sync found at i=', i, 'j=', j);
      console.log('ORIG rem:', orig.substring(i, i + 100));
      console.log('PUB rem:', pub.substring(j, j + 100));
      break;
    }
  } else {
    i++;
    j++;
  }
}
