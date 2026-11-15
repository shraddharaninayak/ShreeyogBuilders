const fs = require('fs');

const p = fs.readFileSync('public/projects/index.html', 'utf8');
console.log('projects/index.html size:', p.length);

// Look for <main or <div id="__nuxt" or section
const idxMain = p.indexOf('<main');
if (idxMain !== -1) {
  console.log('Main found at', idxMain);
  console.log(p.substring(idxMain, idxMain + 1500));
} else {
  console.log('First 1000 chars:');
  console.log(p.substring(0, 1000));
}
