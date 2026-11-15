const fs = require('fs');

const css = fs.readFileSync('public/_nuxt/default.dc95e376.css', 'utf8');
let idx = 0;
while ((idx = css.indexOf('footer', idx)) !== -1) {
  console.log(`=== default.css at ${idx} ===`);
  console.log(css.slice(Math.max(0, idx - 50), Math.min(css.length, idx + 250)));
  idx += 10;
}
