const fs = require('fs');
const c = fs.readFileSync('public/index.html', 'utf8');

let idx = 0;
while ((idx = c.indexOf('-sequence-cards', idx)) !== -1) {
  console.log('Match at', idx, ':', c.substring(idx - 20, idx + 180));
  idx += 15;
}
