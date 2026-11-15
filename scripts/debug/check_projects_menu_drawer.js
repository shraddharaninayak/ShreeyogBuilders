const fs = require('fs');

const pIndex = fs.readFileSync('public/projects/index.html', 'utf8');
console.log('projects ImaginePossible:', pIndex.includes('ImaginePossible'));
console.log('projects full-screen-menu:', pIndex.includes('full-screen-menu'));
console.log('projects menu drawer:', pIndex.includes('m-drawer') || pIndex.includes('menu-drawer'));
