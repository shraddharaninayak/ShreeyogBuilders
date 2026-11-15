const fs = require('fs');

const code = fs.readFileSync('scripts/updates/build_projects_pages.js', 'utf8');

const menuIdx = code.indexOf('menuToggleBtn');
if (menuIdx !== -1) {
  console.log(code.slice(menuIdx - 100, menuIdx + 400));
} else {
  console.log('menuToggleBtn not found in build_projects_pages.js');
}
