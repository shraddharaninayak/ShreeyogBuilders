const fs = require('fs');
const c = fs.readFileSync('public/index.html', 'utf8');

let idx = 0;
while ((idx = c.indexOf('.object-wrapper', idx)) !== -1) {
  console.log('CSS match at', idx, ':', c.substring(idx - 20, idx + 200));
  idx += 15;
}
