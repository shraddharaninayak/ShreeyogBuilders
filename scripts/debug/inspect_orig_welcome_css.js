const fs = require('fs');
const html = fs.readFileSync('public/test-orig/index.html', 'utf8');

const m = html.match(/\.c-welcome[\s\S]*?<\/style>/g);
if (m) {
  m.forEach((s, i) => console.log(`--- Match ${i} ---\n`, s.substring(0, 1000)));
} else {
  console.log('No inline match found');
}
