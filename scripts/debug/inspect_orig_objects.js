const fs = require('fs');

const orig = fs.readFileSync('references/obsidian_original/obsidianassembly.com/index.html', 'utf8');

const start = orig.indexOf('class="c-objects"');
const tagStart = orig.lastIndexOf('<section', start);
const end = orig.indexOf('class="c-connection"');
const tagEnd = orig.lastIndexOf('</section>', end) + 10;

const objectsHtml = orig.substring(tagStart, tagEnd);
console.log('Orig c-objects HTML:');
console.log(objectsHtml);
fs.writeFileSync('scripts/debug/orig_objects.html', objectsHtml);
