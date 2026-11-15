const fs = require('fs');

const html = fs.readFileSync('public/index.html', 'utf8');

const pAfterIdx = html.indexOf('class="c-places-after"');
const objIdx = html.indexOf('class="c-objects"');

console.log('c-places-after index:', pAfterIdx);
console.log('c-objects index:', objIdx);

console.log('Between them:');
console.log(html.slice(pAfterIdx, objIdx + 100));
