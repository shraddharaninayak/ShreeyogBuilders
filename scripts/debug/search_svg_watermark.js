const fs = require('fs');

const css = fs.readFileSync('public/_nuxt/index.a596e4a8.css', 'utf8');
let idx = 0;
while ((idx = css.indexOf('55c3b488', idx)) !== -1) {
  console.log(`=== 55c3b488 at ${idx} ===`);
  console.log(css.slice(Math.max(0, idx - 100), Math.min(css.length, idx + 200)));
  idx += 10;
}

const html = fs.readFileSync('public/index.html', 'utf8');
let hIdx = 0;
while ((hIdx = html.indexOf('55c3b488', hIdx)) !== -1) {
  console.log(`=== 55c3b488 in html at ${hIdx} ===`);
  console.log(html.slice(Math.max(0, hIdx - 100), Math.min(html.length, hIdx + 200)));
  hIdx += 10;
}
