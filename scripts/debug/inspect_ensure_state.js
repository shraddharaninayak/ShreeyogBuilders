const fs = require('fs');
const c = fs.readFileSync('public/_nuxt/entry.6ece3b7b.js', 'utf8');

const idx = c.indexOf('ensureState(');
if (idx !== -1) {
  console.log(c.substring(idx - 50, idx + 800));
}
