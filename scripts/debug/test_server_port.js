process.env.PORT = '3099';
const server = require('../../server.js');
setTimeout(() => {
  server.close(() => {
    console.log('Server verified cleanly on port 3099!');
    process.exit(0);
  });
}, 1000);
