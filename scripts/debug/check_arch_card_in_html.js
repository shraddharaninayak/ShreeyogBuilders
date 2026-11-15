const fs = require('fs');

const html = fs.readFileSync('public/projects/index.html', 'utf8');
const idx = html.indexOf('arch-card');
console.log(html.slice(Math.max(0, idx - 80), Math.min(html.length, idx + 150)));
