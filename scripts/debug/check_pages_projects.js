const fs = require('fs');

if (fs.existsSync('pages/projects.html')) {
  const p = fs.readFileSync('pages/projects.html', 'utf8');
  console.log('pages/projects.html length:', p.length);
  console.log('Has arch-card?', p.includes('arch-card'));
} else {
  console.log('pages/projects.html does not exist');
}
