const fs = require('fs');

const content = fs.readFileSync('public/_nuxt/index.d0184b9b.js', 'utf8');

const matches = content.match(/.{0,80}(?:places|projects).{0,80}/gi);
if (matches) {
  matches.forEach(m => console.log('MATCH:', m));
}
