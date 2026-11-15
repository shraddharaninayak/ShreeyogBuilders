const fs = require('fs');
const css = fs.readFileSync('d:/Shreeyogweb/public/_nuxt/index.a596e4a8.css', 'utf8');

const matches = [];
let pos = 0;
while (true) {
  const idx = css.indexOf('figure', pos);
  if (idx === -1) break;
  const chunk = css.substring(Math.max(0, idx - 40), Math.min(css.length, idx + 200));
  if (chunk.includes('object-holder') || chunk.includes('object-wrapper') || chunk.includes('c-objects')) {
    console.log('Match:\n' + chunk + '\n---');
  }
  pos = idx + 1;
}
