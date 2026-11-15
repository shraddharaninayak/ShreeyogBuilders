const fs = require('fs');

const css = fs.readFileSync('d:/Shreeyogweb/public/_nuxt/places.a8fd09d3.css', 'utf8');
const selectors = css.match(/[^{}]+(?=\{)/g) || [];
const cleanSelectors = [...new Set(selectors.map(s => s.trim()))];
console.log('Remaining selectors (50 to 131):');
console.log(cleanSelectors.slice(50));
