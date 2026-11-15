const fs = require('fs');

const orig = fs.readFileSync('references/obsidian_original/obsidianassembly.com/index.html', 'utf8');
const pub = fs.readFileSync('public/index.html', 'utf8');

function getPlaces(html) {
  const start = html.indexOf('class="c-places"');
  const tagStart = html.lastIndexOf('<section', start);
  const end = html.indexOf('class="c-places-after"');
  const tagEnd = html.lastIndexOf('</section>', end) + 10;
  return html.substring(tagStart, tagEnd);
}

const origPlaces = getPlaces(orig);
const pubPlaces = getPlaces(pub);

console.log('Orig places HTML length:', origPlaces.length);
console.log('Pub places HTML length:', pubPlaces.length);

fs.writeFileSync('scripts/debug/orig_places.html', origPlaces);
fs.writeFileSync('scripts/debug/pub_places.html', pubPlaces);

// Check sequence controllers and triggers
console.log('Orig sequence triggers:');
console.log([...origPlaces.matchAll(/string-sequence-trigger="[^"]*"/g)].map(m => m[0]));

console.log('Pub sequence triggers:');
console.log([...pubPlaces.matchAll(/string-sequence-trigger="[^"]*"/g)].map(m => m[0]));
