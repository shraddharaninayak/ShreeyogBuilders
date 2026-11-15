const fs = require('fs');

const html = fs.readFileSync('public/index.html', 'utf8');

const idx1 = html.indexOf('Explore</span>');
if (idx1 !== -1) {
  const start = html.lastIndexOf('<a', idx1);
  const end = html.indexOf('</a>', idx1) + 4;
  console.log('--- 1. Around Explore ---');
  console.log(html.slice(Math.max(0, start), Math.min(html.length, end)));
}

const idx2 = html.indexOf('EXPLORE OUR APPROACH');
if (idx2 !== -1) {
  const start = html.lastIndexOf('<a', idx2);
  const end = html.indexOf('</a>', idx2) + 4;
  console.log('\n--- 2. Around EXPLORE OUR APPROACH ---');
  console.log(html.slice(Math.max(0, start), Math.min(html.length, end)));
}
