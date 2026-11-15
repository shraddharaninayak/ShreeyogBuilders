const fs = require('fs');

const s = fs.readFileSync('scripts/updates/build_projects_pages.js', 'utf8');

const footerIdx = s.indexOf('buildFooterHtml');
if (footerIdx !== -1) {
  console.log(s.substring(footerIdx, footerIdx + 1500));
} else {
  const fIdx = s.indexOf('<footer');
  console.log(s.substring(fIdx, fIdx + 1500));
}
