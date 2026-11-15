const fs = require('fs');

const s = fs.readFileSync('scripts/updates/build_projects_pages.js', 'utf8');

const compIdx = s.indexOf('c-completed-section');
console.log(s.substring(compIdx - 100, compIdx + 1200));
