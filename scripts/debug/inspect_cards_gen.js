const fs = require('fs');

const s = fs.readFileSync('scripts/updates/build_projects_pages.js', 'utf8');

const cardIdx = s.indexOf('const completedCardsHtml');
console.log(s.substring(cardIdx, cardIdx + 1200));
