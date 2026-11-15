const fs = require('fs');
const c = fs.readFileSync('public/index.html', 'utf8');

let idx = 0;
while ((idx = c.indexOf('class="object-wrapper"', idx)) !== -1) {
  console.log('object-wrapper at', idx, ':', c.substring(idx - 20, idx + 350));
  idx += 22;
}
