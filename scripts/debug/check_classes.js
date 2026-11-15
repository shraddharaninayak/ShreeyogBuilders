const fs = require('fs');

const html = fs.readFileSync('public/about/index.html', 'utf8');
const bodyIdx = html.indexOf('<body');
console.log(html.slice(bodyIdx, bodyIdx + 200));

const appIdx = html.indexOf('id="__nuxt"');
console.log(html.slice(appIdx, appIdx + 300));
