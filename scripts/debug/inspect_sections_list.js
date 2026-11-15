const fs = require('fs');

const p = fs.readFileSync('public/projects/index.html', 'utf8');

const matches = p.match(/<section[^>]*>/g);
console.log('Sections in projects/index.html:', matches);
