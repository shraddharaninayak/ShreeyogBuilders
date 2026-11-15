const fs = require('fs');
const content = fs.readFileSync('d:/Shreeyogweb/public/_nuxt/index.a596e4a8.css', 'utf8');

const idx = content.indexOf('.i-1');
if (idx !== -1) {
  console.log(content.substring(idx - 50, idx + 800));
}
