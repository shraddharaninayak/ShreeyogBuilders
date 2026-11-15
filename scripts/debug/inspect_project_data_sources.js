const fs = require('fs');

console.log('--- Checking references/brochures/bramhand.html ---');
if (fs.existsSync('d:/Shreeyogweb/references/brochures/bramhand.html')) {
  const b = fs.readFileSync('d:/Shreeyogweb/references/brochures/bramhand.html', 'utf8');
  console.log('bramhand.html length:', b.length);
  console.log(b.substring(0, 1500));
}

console.log('\n--- Checking apply_contact_page_update.js ---');
const c = fs.readFileSync('d:/Shreeyogweb/scripts/updates/apply_contact_page_update.js', 'utf8');
console.log(c.substring(0, 1500));

console.log('\n--- Checking apply_interactive_map.js ---');
const m = fs.readFileSync('d:/Shreeyogweb/scripts/updates/apply_interactive_map.js', 'utf8');
console.log(m.substring(0, 1500));
