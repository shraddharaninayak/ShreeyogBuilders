const fs = require('fs');
const html = fs.readFileSync('d:/Shreeyogweb/public/index.html', 'utf8');

const sIdx = html.indexOf('shree-neelkanth');
if (sIdx !== -1) {
  console.log('--- PLACES IN INDEX.HTML PART 3 ---');
  console.log(html.substring(sIdx, sIdx + 1500));
}
