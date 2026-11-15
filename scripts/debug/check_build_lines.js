const fs = require('fs');

const content = fs.readFileSync('scripts/updates/build_projects_pages.js', 'utf8');
const lines = content.split('\n');
console.log(lines.slice(95, 125).join('\n'));
