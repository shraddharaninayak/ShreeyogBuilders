const fs = require('fs');
const html = fs.readFileSync('d:/Shreeyogweb/public/index.html', 'utf8');

const idx = html.indexOf('c-objects');
console.log('c-objects idx in index.html:', idx);
if (idx !== -1) {
  console.log(html.substring(idx, idx + 3500));
}
