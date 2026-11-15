const fs = require('fs');
const path = require('path');

const css = fs.readFileSync('public/_nuxt/index.a596e4a8.css', 'utf-8');

// Find all rules mentioning c-welcome or welcome
const matches = [];
const regex = /([^\{\}]*welcome[^\{\}]*)\{([^\{\}]*)\}/gi;
let m;
while ((m = regex.exec(css)) !== null) {
  matches.push({ selector: m[1].trim(), body: m[2].trim() });
}

console.log('Found', matches.length, 'rules in index.a596e4a8.css:');
for (const item of matches) {
  console.log('--- ' + item.selector + ' ---');
  console.log(item.body);
}
