const fs = require('fs');

const orig = fs.readFileSync('scripts/debug/orig_places_snippet.js', 'utf8');

const matches = [...orig.matchAll(/\bi\b/g)];
console.log('Matches for i in orig places:');
matches.forEach(m => {
  const snippet = orig.substring(Math.max(0, m.index - 30), Math.min(orig.length, m.index + 50));
  if (snippet.includes('.value') || snippet.includes('i=') || snippet.includes('i,')) {
    console.log(snippet);
  }
});
