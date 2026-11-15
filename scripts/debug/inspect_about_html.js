const fs = require('fs');

const html = fs.readFileSync('public/about/index.html', 'utf8');
console.log('HTML length:', html.length);

// Extract main tag
const mainIdx = html.indexOf('<main');
const mainEnd = html.indexOf('</main>', mainIdx);
console.log('Main found from', mainIdx, 'to', mainEnd);
console.log(html.slice(mainIdx, Math.min(mainEnd + 7, mainIdx + 3000)));
