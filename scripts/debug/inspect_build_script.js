const fs = require('fs');

const s = fs.readFileSync('scripts/updates/build_projects_pages.js', 'utf8');
console.log('build_projects_pages.js length:', s.length);
console.log(s.substring(0, 800));
