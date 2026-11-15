const fs = require('fs');

const code = fs.readFileSync('public/_nuxt/people.af477013.js', 'utf8');
console.log('Length:', code.length);
console.log(code.slice(0, 1000));
