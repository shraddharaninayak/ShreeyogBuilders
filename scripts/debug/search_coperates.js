const fs = require('fs');

const html = fs.readFileSync('public/about/index.html', 'utf8');

let pos = html.indexOf('c-operates');
while (pos !== -1) {
  console.log('pos:', pos, html.slice(pos - 20, pos + 200));
  pos = html.indexOf('c-operates', pos + 10);
}
