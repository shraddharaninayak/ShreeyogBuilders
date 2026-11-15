const fs = require('fs');

const p = fs.readFileSync('public/_nuxt/people.af477013.js', 'utf8');

console.log('Full people.af477013.js content:');
console.log(p);
