const fs = require('fs');

const html = fs.readFileSync('public/about/index.html', 'utf8');
const headEnd = html.indexOf('</head>');
console.log('Head ends at:', headEnd);
console.log(html.slice(headEnd - 800, headEnd));
