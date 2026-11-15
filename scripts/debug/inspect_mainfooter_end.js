const fs = require('fs');

const css = fs.readFileSync('public/_nuxt/MainFooter.8675ce94.css', 'utf8');
const idx = css.indexOf('/* --- Shreeyog Restored Footer Structure & Alignment --- */');
console.log(css.slice(idx));
