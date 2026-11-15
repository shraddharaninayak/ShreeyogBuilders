const fs = require('fs');
const css = fs.readFileSync('d:/Shreeyogweb/public/_nuxt/default.dc95e376.css', 'utf8');

const matches = [];
let pos = 0;
while (true) {
  const idx = css.indexOf('img', pos);
  if (idx === -1) break;
  const chunk = css.substring(Math.max(0, idx - 20), Math.min(css.length, idx + 100));
  if (chunk.includes('img{') || chunk.includes('img {') || chunk.includes('img,')) {
    console.log('Match img in default.css:\n' + chunk + '\n---');
  }
  pos = idx + 1;
}
