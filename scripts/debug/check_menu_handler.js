const fs = require('fs');

const code = fs.readFileSync('scripts/updates/build_projects_pages.js', 'utf8');

const matches = code.match(/menuToggleBtn/g);
console.log('menuToggleBtn count in build_projects_pages.js:', matches ? matches.length : 0);

// Check if any click handler is attached to menuToggleBtn in build_projects_pages.js
console.log('Includes addEventListener for menuToggleBtn:', code.includes("getElementById('menuToggleBtn')"));
