const fs = require('fs');

const css = fs.readFileSync('public/_nuxt/shreeyog-projects.css', 'utf8');

const idx = css.indexOf('.featured-content-panel');
console.log(css.substring(idx, idx + 1200));
