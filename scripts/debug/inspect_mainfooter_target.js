const fs = require('fs');

const css = fs.readFileSync('public/_nuxt/MainFooter.8675ce94.css', 'utf8');
const idx = css.indexOf('/* --- Shreeyog Footer Customizations --- */');
console.log('Index in MainFooter.8675ce94.css:', idx);
console.log(css.slice(idx, idx + 1000));
