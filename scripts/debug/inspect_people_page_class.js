const fs = require('fs');
const html = fs.readFileSync('public/people/index.html', 'utf8');
const m = html.match(/<main[^>]*>/);
console.log('main tag in people/index.html:', m ? m[0] : 'not found');
const b = html.match(/<body[^>]*>/);
console.log('body tag in people/index.html:', b ? b[0] : 'not found');
const p = html.match(/class="[^"]*page[^"]*"/g);
console.log('page classes in people/index.html:', p);
