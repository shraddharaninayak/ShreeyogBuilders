const fs = require('fs');

const css = fs.readFileSync('public/_nuxt/MainFooter.8675ce94.css', 'utf8');
console.log('MainFooter CSS:');
console.log(css);
