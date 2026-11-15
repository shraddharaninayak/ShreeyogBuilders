const fs = require('fs');

const p = fs.readFileSync('public/projects/index.html', 'utf8');

const ids = [
  'featImg',
  'featStatus',
  'featLoc',
  'featCounter',
  'featName',
  'featDesc',
  'featLink',
  'featPrev',
  'featNext'
];

ids.forEach(id => {
  console.log('ID', id, 'found:', p.includes(`id="${id}"`));
});
