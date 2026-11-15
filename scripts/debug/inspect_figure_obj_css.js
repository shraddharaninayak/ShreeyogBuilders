const fs = require('fs');
const css = fs.readFileSync('d:/Shreeyogweb/public/_nuxt/index.a596e4a8.css', 'utf8');

const idx = css.indexOf('.c-objects .-w .sequence .object-wrapper .object-holder figure');
if (idx !== -1) {
  console.log(css.substring(idx - 100, idx + 600));
}
