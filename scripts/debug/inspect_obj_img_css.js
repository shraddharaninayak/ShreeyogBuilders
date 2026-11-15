const fs = require('fs');
const css = fs.readFileSync('d:/Shreeyogweb/public/_nuxt/index.a596e4a8.css', 'utf8');

const matches = [];
let pos = 0;
while (true) {
  const idx = css.indexOf('img', pos);
  if (idx === -1) break;
  const chunk = css.substring(Math.max(0, idx - 40), Math.min(css.length, idx + 200));
  if (chunk.includes('data-v-99613b87') || chunk.includes('object-holder') || chunk.includes('object-wrapper')) {
    console.log('Match img:\n' + chunk + '\n---');
  }
  pos = idx + 1;
}
console.log('Done searching img');
