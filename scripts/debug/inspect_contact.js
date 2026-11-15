const fs = require('fs');
const html = fs.readFileSync('public/contact/index.html', 'utf8');
const idx = html.indexOf('class="c-about"');
console.log('c-about at:', idx);
console.log(html.substring(idx, idx + 4500));
