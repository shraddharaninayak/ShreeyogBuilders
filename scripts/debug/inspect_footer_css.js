const fs = require('fs');

const html = fs.readFileSync('public/index.html', 'utf8');

// Find all CSS rules touching footer, .-w.after, and stone-3 in index.html
const styleIdx = html.indexOf('footer-shreeyog-brand-logo');
if (styleIdx !== -1) {
  const start = html.lastIndexOf('<style', styleIdx);
  const end = html.indexOf('</style>', styleIdx);
  console.log('Found style block containing footer-shreeyog-brand-logo, length:', end - start);
  console.log(html.slice(start, end + 8));
}

// Also check default.dc95e376.css or index.a596e4a8.css for footer styles
const cssFiles = [
  'public/_nuxt/default.dc95e376.css',
  'public/_nuxt/index.a596e4a8.css',
  'public/_nuxt/shreeyog-navbar.css'
];

for (const file of cssFiles) {
  if (fs.existsSync(file)) {
    const css = fs.readFileSync(file, 'utf8');
    const matches = css.match(/(?:^|\})([^{}]*(?:page-footer|\.stone-3|\.-w\.after)[^{}]*\{[^}]*\})/g);
    if (matches) {
      console.log(`\n=== Matches in ${file} (${matches.length}) ===`);
      matches.slice(0, 10).forEach(m => console.log(m.slice(0, 200)));
    }
  }
}
