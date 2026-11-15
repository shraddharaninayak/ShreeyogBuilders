const fs = require('fs');
const html = fs.readFileSync('public/index.html', 'utf8');

const start = html.indexOf('<style id="shreeyog-hero-custom">');
const end = html.indexOf('</style>', start);
console.log(html.substring(start, end + 8));
