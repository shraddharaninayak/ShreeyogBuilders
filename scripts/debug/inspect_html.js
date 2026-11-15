const fs = require('fs');
const html = fs.readFileSync('public/index.html', 'utf8');
const idx = html.indexOf('sticky-container-1');
console.log('--- c-objects DOM chunk 2 ---');
console.log(html.slice(idx, idx + 2500));
