const fs = require('fs');

const code = fs.readFileSync('scripts/updates/sync_all_nav_html.js', 'utf8');
console.log('sync_all_nav_html.js:');
console.log(code);
