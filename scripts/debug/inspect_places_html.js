const fs = require('fs');
const html = fs.readFileSync('d:/Shreeyogweb/public/index.html', 'utf8');

const pIdx = html.indexOf('class="c-places"');
if (pIdx !== -1) {
  console.log('--- PLACES IN INDEX.HTML ---');
  console.log(html.substring(pIdx, pIdx + 3500));
}
