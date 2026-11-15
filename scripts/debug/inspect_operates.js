const fs = require('fs');

const html = fs.readFileSync('public/about/index.html', 'utf8');

const opIdx = html.indexOf('c-operates');
console.log(html.slice(opIdx, opIdx + 1500));
