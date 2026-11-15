const fs = require('fs');
const c = fs.readFileSync('public/_nuxt/entry.6ece3b7b.js', 'utf8');

const lastExport = c.lastIndexOf('export{');
if (lastExport !== -1) {
  console.log(c.substring(lastExport, lastExport + 600));
}
