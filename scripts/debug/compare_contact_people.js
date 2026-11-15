const fs = require('fs');

console.log('contact/index.html exists:', fs.existsSync('public/contact/index.html'));
console.log('people/index.html exists:', fs.existsSync('public/people/index.html'));
if (fs.existsSync('public/contact/index.html') && fs.existsSync('public/people/index.html')) {
  console.log('contact len:', fs.readFileSync('public/contact/index.html', 'utf8').length);
  console.log('people len:', fs.readFileSync('public/people/index.html', 'utf8').length);
}
