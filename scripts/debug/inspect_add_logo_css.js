const fs = require('fs');

if (fs.existsSync('scripts/updates/add_logo_css.js')) {
  console.log(fs.readFileSync('scripts/updates/add_logo_css.js', 'utf8'));
} else {
  console.log('File does not exist');
}
