const fs = require('fs');

const html = fs.readFileSync('public/contact/index.html', 'utf8');

function printSection(name) {
  const start = html.indexOf(`<section class="${name}"`);
  if (start === -1) {
    console.log(`Section ${name} not found`);
    return;
  }
  const end = html.indexOf('</section>', start) + 10;
  console.log(`=== SECTION: ${name} (length: ${end - start}) ===`);
  console.log(html.slice(start, end));
}

printSection('c-welcome');
printSection('c-about');
printSection('c-cta');
