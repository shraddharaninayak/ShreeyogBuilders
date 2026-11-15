const fs = require('fs');

const s1 = fs.readFileSync('scripts/updates/sync_all_nav_html.js', 'utf8');
console.log('=== sync_all_nav_html.js ===');
let idx = s1.indexOf('footer-shreeyog-title');
if (idx !== -1) {
  console.log(s1.slice(Math.max(0, idx - 100), Math.min(s1.length, idx + 400)));
}
