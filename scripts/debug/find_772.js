const fs = require('fs');
const c = fs.readFileSync('public/index.html', 'utf8');

let idx = 0;
while ((idx = c.indexOf('772', idx)) !== -1) {
  console.log('772 in index.html at', idx, ':', c.substring(idx - 30, idx + 60));
  idx += 3;
}
