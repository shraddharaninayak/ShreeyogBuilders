const fs = require('fs');

const html = fs.readFileSync('public/about/index.html', 'utf8');

const opIdx = html.indexOf('<section class="c-operates"');
const opEnd = html.indexOf('</section>', opIdx);
console.log(html.slice(opIdx, opEnd + 10));
