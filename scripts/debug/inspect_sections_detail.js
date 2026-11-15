const fs = require('fs');

const p = fs.readFileSync('public/projects/index.html', 'utf8');

function printSection(secClass) {
  const start = p.indexOf(`<section class="${secClass}"`);
  if (start === -1) {
    console.log('Not found:', secClass);
    return;
  }
  const end = p.indexOf('</section>', start);
  console.log(`=== ${secClass} (${end - start} chars) ===`);
  console.log(p.substring(start, Math.min(start + 2500, end + 10)));
}

printSection('c-highlighted-section');
printSection('c-completed-section');
