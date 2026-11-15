const fs = require('fs');

const pIndex = fs.readFileSync('public/projects/index.html', 'utf8');
const headerMatch = pIndex.match(/<header[\s\S]*?<\/header>/);
console.log('projects/index.html header:');
console.log(headerMatch ? headerMatch[0] : 'None');

// Check build_projects_pages.js
const buildScript = fs.readFileSync('scripts/updates/build_projects_pages.js', 'utf8');
console.log('build_projects_pages.js includes send request:', buildScript.includes('send request'));
