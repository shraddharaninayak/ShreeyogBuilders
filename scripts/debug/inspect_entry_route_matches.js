const fs = require('fs');

const entry = fs.readFileSync('public/_nuxt/entry.6ece3b7b.js', 'utf8');

const matches = entry.match(/.{0,50}(?:name:"places"|path:"\/places"|name:"projects"|path:"\/projects").{0,50}/g);
if (matches) {
  matches.forEach(m => console.log('MATCH:', m));
}
