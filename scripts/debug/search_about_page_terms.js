const fs = require('fs');

const html = fs.readFileSync('public/about/index.html', 'utf8');

let pos = 0;
while ((pos = html.indexOf('shreeyog-landmark', pos)) !== -1) {
  console.log('shreeyog-landmark at pos:', pos);
  console.log(html.slice(Math.max(0, pos - 150), Math.min(html.length, pos + 250)));
  pos += 18;
}

pos = 0;
while ((pos = html.indexOf('line-2', pos)) !== -1) {
  console.log('line-2 at pos:', pos);
  console.log(html.slice(Math.max(0, pos - 100), Math.min(html.length, pos + 200)));
  pos += 7;
}
