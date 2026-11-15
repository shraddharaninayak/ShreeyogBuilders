const fs = require('fs');

const p = fs.readFileSync('public/projects/index.html', 'utf8');

const footerStart = p.indexOf('<footer');
const footerEnd = p.indexOf('</footer>');

if (footerStart !== -1 && footerEnd !== -1) {
  const footerContent = p.substring(footerStart, footerEnd + '</footer>'.length);
  console.log(footerContent);
}
