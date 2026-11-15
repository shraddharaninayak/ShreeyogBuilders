const fs = require('fs');

const pub = fs.readFileSync('public/index.html', 'utf8');

const start = pub.indexOf('class="c-objects"');
const tagStart = pub.lastIndexOf('<section', start);
const end = pub.indexOf('class="c-connection"');
const tagEnd = pub.lastIndexOf('</section>', end) + 10;

const objectsHtml = pub.substring(tagStart, tagEnd);
console.log('Pub c-objects HTML:');
console.log(objectsHtml);
fs.writeFileSync('scripts/debug/pub_objects.html', objectsHtml);
