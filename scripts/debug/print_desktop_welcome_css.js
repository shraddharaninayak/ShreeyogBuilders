const fs = require('fs');

const css = fs.readFileSync('public/_nuxt/about.5756c083.css', 'utf8');

const idx = css.indexOf('@media (min-width:1024px){.c-welcome');
console.log(css.slice(idx, idx + 1000));
