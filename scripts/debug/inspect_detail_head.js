const fs = require('fs');

const p = fs.readFileSync('public/projects/shree-bramhand/index.html', 'utf8');
console.log('First 500 chars of detail page:');
console.log(p.substring(0, 500));
