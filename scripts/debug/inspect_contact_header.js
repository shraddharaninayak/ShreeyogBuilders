const fs = require('fs');

const html = fs.readFileSync('public/contact/index.html', 'utf8');
const headerMatch = html.match(/<header[\s\S]*?<\/header>/);
console.log('Header in contact/index.html:');
console.log(headerMatch ? headerMatch[0] : 'None');
