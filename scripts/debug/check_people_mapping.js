const fs = require('fs');

const entry = fs.readFileSync('public/_nuxt/entry.6ece3b7b.js', 'utf8');

const idx = entry.indexOf('people.af477013.js');
if (idx !== -1) {
  console.log(entry.slice(Math.max(0, idx - 200), idx + 200));
}
