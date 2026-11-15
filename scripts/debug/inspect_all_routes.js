const fs = require('fs');

const content = fs.readFileSync('public/_nuxt/entry.6ece3b7b.js', 'utf8');
const idx = content.indexOf('{name:"places"');
if (idx !== -1) {
  console.log(content.substring(idx - 600, idx + 800));
}
