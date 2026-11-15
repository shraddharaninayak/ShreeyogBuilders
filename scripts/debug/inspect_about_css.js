const fs = require('fs');

const css = fs.readFileSync('public/_nuxt/about.5756c083.css', 'utf8');
console.log('about.5756c083.css length:', css.length);
console.log(css);
