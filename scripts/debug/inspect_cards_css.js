const fs = require('fs');
const content = fs.readFileSync('d:/Shreeyogweb/public/_nuxt/index.a596e4a8.css', 'utf8');

const idx = content.indexOf('.c-places .places-story .-w .sticky-container .-gc figure.i');
if (idx !== -1) {
  console.log(content.substring(idx, idx + 1200));
}
