const fs = require('fs');
const c = fs.readFileSync('public/index.html', 'utf8');

const idx = c.indexOf('class="c-connection"');
if (idx !== -1) {
  console.log(c.substring(idx - 300, idx + 1500));
}
