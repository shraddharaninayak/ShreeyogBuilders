const fs = require('fs');

const indexHtml = fs.readFileSync('public/index.html', 'utf8');
const start = indexHtml.indexOf('<footer');
const end = indexHtml.indexOf('</footer>', start);
console.log(indexHtml.substring(start, end + 9));
