const fs = require('fs');

const orig = fs.readFileSync('scripts/debug/orig_places.html', 'utf8');
const pub = fs.readFileSync('scripts/debug/pub_places.html', 'utf8');

console.log('--- ORIG PLACES ---');
console.log(orig);

console.log('\n--- PUB PLACES ---');
console.log(pub);
