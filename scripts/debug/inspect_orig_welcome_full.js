const fs = require('fs');
const html = fs.readFileSync('public/test-orig/index.html', 'utf8');

const m = html.match(/<style[^>]*>([\s\S]*?\.c-welcome[\s\S]*?)<\/style>/g);
if (m) {
  m.forEach((s, i) => console.log(`--- Style Tag ${i} ---\n`, s));
}
