const fs = require('fs');

const p = fs.readFileSync('data/projects.js', 'utf8');
console.log('data/projects.js content:');
console.log(p);
