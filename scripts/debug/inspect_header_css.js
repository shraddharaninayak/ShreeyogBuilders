const fs = require('fs');

const css = fs.readFileSync('public/_nuxt/default.dc95e376.css', 'utf8');

// Find all rules with data-v-81ce8483
const rules = css.match(/[^{}]+data-v-81ce8483[^{}]*\{[^{}]*\}/g);
console.log('Total rules with data-v-81ce8483:', rules ? rules.length : 0);

// Filter rules relating to request, sep, places, objects, menu-wrap, and .-w in header
const headerRules = rules.filter(r => 
  r.includes('.request') || 
  r.includes('.places') || 
  r.includes('.objects') || 
  r.includes('.sep') || 
  r.includes('.menu-wrap') || 
  r.includes('header')
);
headerRules.forEach(r => console.log(r));
