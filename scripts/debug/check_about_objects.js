const fs = require('fs');

console.log('public/about/index.html exists:', fs.existsSync('public/about/index.html'));
if (fs.existsSync('public/about/index.html')) {
  console.log('about length:', fs.readFileSync('public/about/index.html', 'utf8').length);
}

console.log('public/objects/index.html exists:', fs.existsSync('public/objects/index.html'));
if (fs.existsSync('public/objects/index.html')) {
  console.log('objects length:', fs.readFileSync('public/objects/index.html', 'utf8').length);
}
