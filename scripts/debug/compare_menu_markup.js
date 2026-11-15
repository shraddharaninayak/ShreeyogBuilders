const fs = require('fs');

// Check projects/index.html vs index.html
const pIndex = fs.readFileSync('public/projects/index.html', 'utf8');
const hIndex = fs.readFileSync('public/index.html', 'utf8');

console.log('projects menu markup:');
console.log(pIndex.match(/<div class="menu[^"]*"[\s\S]*?<\/div>/)?.[0]);

console.log('index menu markup:');
console.log(hIndex.match(/<div class="menu-wrap"[\s\S]*?<\/div>/)?.[0]);
