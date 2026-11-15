const fs = require('fs');

const html = fs.readFileSync('d:/Shreeyogweb/public/places/index.html', 'utf8');

const headerIdx = html.indexOf('<header');
const headerEnd = html.indexOf('</header>');
if (headerIdx !== -1 && headerEnd !== -1) {
  console.log('--- Header in places/index.html ---');
  console.log(html.substring(headerIdx, headerEnd + 9));
}

const footerIdx = html.indexOf('<footer');
const footerEnd = html.indexOf('</footer>');
if (footerIdx !== -1 && footerEnd !== -1) {
  console.log('--- Footer in places/index.html ---');
  console.log(html.substring(footerIdx, footerEnd + 9));
}
