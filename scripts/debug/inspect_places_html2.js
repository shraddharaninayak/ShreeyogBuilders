const fs = require('fs');
const html = fs.readFileSync('d:/Shreeyogweb/public/index.html', 'utf8');

const sIdx = html.indexOf('Shree Shakun');
if (sIdx !== -1) {
  console.log('--- PLACES IN INDEX.HTML PART 2 ---');
  console.log(html.substring(sIdx, sIdx + 3000));
}
