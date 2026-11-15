const fs = require('fs');
const content = fs.readFileSync('d:/Shreeyogweb/public/_nuxt/index.a596e4a8.css', 'utf8');

const idx = content.indexOf('sequence-controller');
if (idx !== -1) {
  console.log(content.substring(idx - 100, idx + 800));
}

const idx2 = content.indexOf('.c-places figure');
if (idx2 !== -1) {
  console.log(content.substring(idx2 - 100, idx2 + 800));
}
