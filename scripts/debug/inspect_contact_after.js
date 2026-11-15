const fs = require('fs');
const html = fs.readFileSync('public/contact/index.html', 'utf8');
const idx = html.indexOf('class="c-about"');
console.log(html.substring(idx + 3000, idx + 8000));
