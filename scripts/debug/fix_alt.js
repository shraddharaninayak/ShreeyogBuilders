const fs = require('fs');

function fixAlt(filePath) {
  let html = fs.readFileSync(filePath, 'utf8');
  html = html.replace(
    'alt="Shreeyog Residential Interior"',
    'alt="Shreeyog Builders & Land Developers"'
  );
  fs.writeFileSync(filePath, html, 'utf8');
  console.log('Fixed alt in', filePath);
}

fixAlt('public/index.html');
if (fs.existsSync('pages/index.html')) {
  fixAlt('pages/index.html');
}
