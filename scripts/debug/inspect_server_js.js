const fs = require('fs');

const srv = fs.readFileSync('d:/Shreeyogweb/server.js', 'utf8');
console.log('server.js:\n', srv);
