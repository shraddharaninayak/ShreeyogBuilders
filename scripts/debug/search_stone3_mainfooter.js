const fs = require('fs');

const css = fs.readFileSync('public/_nuxt/MainFooter.8675ce94.css', 'utf8');
let idx = 0;
while ((idx = css.indexOf('stone-3', idx)) !== -1) {
  console.log(`=== stone-3 at ${idx} ===`);
  console.log(css.slice(Math.max(0, idx - 100), Math.min(css.length, idx + 300)));
  idx += 10;
}
