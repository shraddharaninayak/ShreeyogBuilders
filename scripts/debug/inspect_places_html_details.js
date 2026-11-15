const fs = require('fs');

const p1 = 'd:/Shreeyogweb/public/places/index.html';
const p2 = 'd:/Shreeyogweb/pages/projects.html';

console.log('p1 exists:', fs.existsSync(p1), 'size:', fs.statSync(p1).size);
console.log('p2 exists:', fs.existsSync(p2), 'size:', fs.statSync(p2).size);

const c1 = fs.readFileSync(p1, 'utf8');
const c2 = fs.readFileSync(p2, 'utf8');

console.log('Are p1 and p2 identical?:', c1 === c2);

// Check routes and router in nuxt bundle
const glob = fs.readdirSync('d:/Shreeyogweb/public/_nuxt');
console.log('All _nuxt files:', glob);
