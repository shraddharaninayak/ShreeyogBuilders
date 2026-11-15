const fs = require('fs');

const css = fs.readFileSync('public/_nuxt/default.dc95e376.css', 'utf8');

// Find all rules for menu-wrap, menu-icon, and header .button
const regex = /header[^{}]*menu[^{}]*\{[^{}]*\}/g;
let m;
while ((m = regex.exec(css)) !== null) {
  console.log(m[0]);
}

console.log('--- BaseButton CSS ---');
const buttonCss = fs.readFileSync('public/_nuxt/BaseButton.f15eb43b.css', 'utf8');
console.log(buttonCss);
