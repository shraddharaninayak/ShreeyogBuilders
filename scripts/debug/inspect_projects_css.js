const fs = require('fs');

const css = fs.readFileSync('public/_nuxt/shreeyog-projects.css', 'utf8');
console.log('CSS length:', css.length);
console.log('First 500 chars:');
console.log(css.substring(0, 500));
