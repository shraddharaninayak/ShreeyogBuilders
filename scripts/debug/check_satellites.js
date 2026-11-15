const fs = require('fs');

const p = fs.readFileSync('public/projects/index.html', 'utf8');
const satIdx = p.indexOf('satellite-card');
console.log('Satellite in public/projects/index.html:');
console.log(p.slice(satIdx - 100, satIdx + 400));

// Check if there is JS event listener for satellite-card
console.log('\nHas satellite JS click handler?');
console.log(p.includes('satellite-card') && p.includes('.satellite-card'));
const sIdx = p.indexOf('satellite');
while (sIdx !== -1) {
  // find script tags
  const scrIdx = p.indexOf('<script', sIdx);
  break;
}
