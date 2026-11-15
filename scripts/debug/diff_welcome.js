const fs = require('fs');

const orig = fs.readFileSync('scripts/debug/orig_welcome.html', 'utf8');
const pub = fs.readFileSync('scripts/debug/pub_welcome.html', 'utf8');

// Compare line by line or diff
console.log('--- ORIG WELCOME ---');
console.log(orig);
console.log('\n--- PUB WELCOME ---');
console.log(pub);
