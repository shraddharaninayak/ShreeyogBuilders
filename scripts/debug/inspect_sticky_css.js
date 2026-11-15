const fs = require('fs');
const css = fs.readFileSync('d:/Shreeyogweb/public/_nuxt/index.a596e4a8.css', 'utf8');

const idx = css.indexOf('.c-places .places-story .-w .sticky-container');
if (idx !== -1) {
  console.log(css.substring(idx, idx + 800));
}
