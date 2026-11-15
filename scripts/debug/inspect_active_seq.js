const fs = require('fs');
const css = fs.readFileSync('d:/Shreeyogweb/public/_nuxt/index.a596e4a8.css', 'utf8');

const idx = css.indexOf('.sequence-controller figure.-active');
if (idx !== -1) {
  console.log(css.substring(idx - 50, idx + 600));
} else {
  const idx2 = css.indexOf('figure.-active');
  console.log('figure.-active idx:', idx2);
  if (idx2 !== -1) console.log(css.substring(idx2 - 50, idx2 + 600));
}
