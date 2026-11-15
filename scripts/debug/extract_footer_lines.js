const fs = require('fs');

const html = fs.readFileSync('public/index.html', 'utf8');
const lines = html.split('\n');

lines.forEach((l, i) => {
  if (l.includes('footer-shreeyog') || l.includes('footer .-w.after') || l.includes('footer .stone-3') || l.includes('page-footer')) {
    console.log(`Line ${i + 1}: ${l}`);
  }
});
