const fs = require('fs');

const html = fs.readFileSync('public/about/index.html', 'utf8');
console.log('Includes about-page?', html.includes('about-page'));

const mainIdx = html.indexOf('<main');
if (mainIdx !== -1) {
  console.log(html.slice(mainIdx, mainIdx + 200));
}
