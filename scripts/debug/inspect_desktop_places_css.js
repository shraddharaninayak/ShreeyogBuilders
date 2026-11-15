const fs = require('fs');
const css = fs.readFileSync('d:/Shreeyogweb/public/_nuxt/index.a596e4a8.css', 'utf8');

const idx = css.indexOf('@media (min-width:1024px){.c-places');
if (idx !== -1) {
  console.log(css.substring(idx, idx + 1200));
} else {
  const idx2 = css.lastIndexOf('.c-places .places-story .-w .sticky-container');
  console.log(css.substring(idx2, idx2 + 1200));
}
