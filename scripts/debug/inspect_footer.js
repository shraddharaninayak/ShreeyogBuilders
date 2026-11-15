const fs = require('fs');

const html = fs.readFileSync('public/index.html', 'utf8');

// Search for footer element or classes
const footerIdx = html.indexOf('<footer');
if (footerIdx !== -1) {
  const end = html.indexOf('</footer>', footerIdx);
  console.log('=== <footer ...> element ===');
  console.log(html.slice(footerIdx, end + 9));
} else {
  console.log('No <footer tag. Searching for footer-shreeyog or footer classes...');
}

// Find footer-shreeyog occurrences
let pos = 0;
while ((pos = html.indexOf('footer-shreeyog', pos)) !== -1) {
  console.log('Found footer-shreeyog at pos', pos);
  console.log(html.slice(Math.max(0, pos - 100), Math.min(html.length, pos + 300)));
  pos += 15;
}
