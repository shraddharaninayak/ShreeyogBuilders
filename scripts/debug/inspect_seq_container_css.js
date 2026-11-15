const fs = require('fs');
const css = fs.readFileSync('d:/Shreeyogweb/public/_nuxt/index.a596e4a8.css', 'utf8');

const idx = css.indexOf('.sequence-container[data-v-7eb8a498]');
if (idx !== -1) {
  console.log(css.substring(idx - 50, idx + 600));
}
