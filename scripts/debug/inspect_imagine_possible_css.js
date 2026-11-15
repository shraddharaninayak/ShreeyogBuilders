const fs = require('fs');

const css = fs.readFileSync('public/_nuxt/default.dc95e376.css', 'utf8');

const idx = css.indexOf('#ImaginePossible');
console.log(css.substring(idx - 100, idx + 400));
