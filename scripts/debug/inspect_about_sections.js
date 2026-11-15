const fs = require('fs');

const html = fs.readFileSync('public/about/index.html', 'utf8');

const matches = html.match(/<section[^>]*class="([^"]*)"/g);
console.log('Sections in public/about/index.html:');
console.log(matches);
