const fs = require('fs');

const css = fs.readFileSync('d:/Shreeyogweb/public/_nuxt/default.dc95e376.css', 'utf8');

const matches = [];
let pos = 0;
while (true) {
  const idx = css.indexOf('--c-', pos);
  if (idx === -1) break;
  matches.push(css.substring(idx, idx + 40));
  pos = idx + 1;
}
console.log('Sample color vars:', [...new Set(matches)].slice(0, 20));
