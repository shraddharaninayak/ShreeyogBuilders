const fs = require('fs');

const orig = fs.readFileSync('scripts/debug/orig_places_snippet.js', 'utf8');

const matches = [...orig.matchAll(/f\.value/g)];
console.log('Matches for f.value in orig places:', matches.length);
matches.forEach(m => {
  console.log('\n--- Match at', m.index, '---');
  console.log(orig.substring(Math.max(0, m.index - 80), Math.min(orig.length, m.index + 150)));
});
