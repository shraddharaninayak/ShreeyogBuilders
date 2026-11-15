const fs = require('fs');
const entry = fs.readFileSync('public/_nuxt/entry.6ece3b7b.js', 'utf8');

// Search for scroll event listeners
const matches = [];
let pos = 0;
while ((pos = entry.indexOf('scroll', pos)) !== -1) {
  const snippet = entry.slice(Math.max(0, pos - 50), pos + 100);
  if (snippet.includes('addEventListener') || snippet.includes('window') || snippet.includes('scrollTop') || snippet.includes('scrollY')) {
    matches.push(snippet);
  }
  pos += 50;
}
console.log('Scroll matches count:', matches.length);
console.log(matches.slice(0, 10).join('\n---\n'));
