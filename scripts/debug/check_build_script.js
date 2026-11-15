const fs = require('fs');

const buildScript = fs.readFileSync('scripts/updates/build_projects_pages.js', 'utf8');
const lines = buildScript.split('\n').filter(l => l.toLowerCase().includes('request'));
console.log('Lines with request in build_projects_pages.js:');
console.log(lines);
