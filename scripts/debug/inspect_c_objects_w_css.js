const fs = require('fs');
const c = fs.readFileSync('public/index.html', 'utf8');

let idx = 0;
while ((idx = c.indexOf('.c-objects .-w', idx)) !== -1) {
  console.log('Match at', idx, ':', c.substring(idx - 10, idx + 180));
  idx += 14;
}
