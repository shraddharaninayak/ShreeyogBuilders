const fs = require('fs');

console.log('=== PACKAGE.JSON ===');
console.log(fs.readFileSync('package.json', 'utf8'));

console.log('=== SERVER.JS ===');
console.log(fs.readFileSync('server.js', 'utf8'));
