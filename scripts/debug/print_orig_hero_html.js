const fs = require('fs');
const html = fs.readFileSync('public/test-orig/index.html', 'utf8');
const start = html.indexOf('<section class="c-welcome"');
const end = html.indexOf('</section>', start);
console.log(html.substring(start, end + 10));
