const fs = require('fs');

if (fs.existsSync('scripts/updates/fix_menu_exact.js')) {
  console.log(fs.readFileSync('scripts/updates/fix_menu_exact.js', 'utf8'));
} else {
  console.log('Not found');
}
