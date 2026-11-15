const fs = require('fs');

const script = fs.readFileSync('scripts/updates/apply_contact_page_update.js', 'utf8');
console.log('Script length:', script.length);
// Check how it modifies people.af477013.js and HTML
console.log('Script targets:');
const lines = script.split('\n');
lines.forEach((l, i) => {
  if (l.includes('peopleJs.replace') || l.includes('html.replace') || l.includes('fs.writeFileSync')) {
    console.log(`Line ${i + 1}: ${l.slice(0, 80)}`);
  }
});
