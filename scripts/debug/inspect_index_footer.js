const fs = require('fs');

const html = fs.readFileSync('public/index.html', 'utf8');

const footerIdx = html.indexOf('<footer');
if (footerIdx !== -1) {
  console.log(html.substring(footerIdx, footerIdx + 1500));
}
