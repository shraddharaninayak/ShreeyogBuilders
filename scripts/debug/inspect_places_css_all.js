const fs = require('fs');

const css = fs.readFileSync('d:/Shreeyogweb/public/_nuxt/places.a8fd09d3.css', 'utf8');
console.log('places.a8fd09d3.css length:', css.length);

// Let's print out all selector names in places.a8fd09d3.css
const selectors = css.match(/[^{}]+(?=\{)/g) || [];
console.log('Total rules:', selectors.length);
console.log('Sample selectors:');
const cleanSelectors = [...new Set(selectors.map(s => s.trim()))];
console.log(cleanSelectors.slice(0, 50));
