const fs = require('fs');
const css = fs.readFileSync('d:/Shreeyogweb/public/_nuxt/index.a596e4a8.css', 'utf8');

console.log('Last 1000 chars of index.a596e4a8.css:');
console.log(css.substring(css.length - 1000));
