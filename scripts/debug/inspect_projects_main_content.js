const fs = require('fs');

const p = fs.readFileSync('public/projects/index.html', 'utf8');

const mainStart = p.indexOf('<main class="page-main">');
const mainEnd = p.indexOf('</main>');

if (mainStart !== -1 && mainEnd !== -1) {
  const mainContent = p.substring(mainStart + '<main class="page-main">'.length, mainEnd);
  console.log('Main content length:', mainContent.length);
  console.log('First 300 chars:', mainContent.substring(0, 300));
  console.log('Last 300 chars:', mainContent.substring(mainContent.length - 300));
}
