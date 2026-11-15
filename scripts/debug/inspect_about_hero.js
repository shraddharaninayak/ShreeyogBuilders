const fs = require('fs');

const html = fs.readFileSync('public/about/index.html', 'utf8');
const start = html.indexOf('class="c-welcome');
if (start !== -1) {
  const sectionStart = html.lastIndexOf('<section', start);
  const sectionEnd = html.indexOf('</section>', start) + 10;
  console.log(html.slice(sectionStart, sectionEnd));
} else {
  console.log('c-welcome not found');
}
