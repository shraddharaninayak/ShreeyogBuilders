const fs = require('fs');
const c = fs.readFileSync('public/index.html', 'utf8');

const idx = c.indexOf('class="connection-figure"');
if (idx !== -1) {
  console.log(c.substring(idx - 50, idx + 800));
}
