const fs = require('fs');

const css = fs.readFileSync('public/_nuxt/shreeyog-projects.css', 'utf8');
console.log('shreeyog-projects.css size:', css.length);
