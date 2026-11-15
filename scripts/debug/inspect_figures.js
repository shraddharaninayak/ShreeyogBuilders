const fs = require('fs');
const html = fs.readFileSync('public/index.html', 'utf8');

const sIdx = html.indexOf('class="c-objects"');
const eIdx = html.indexOf('class="s-wrapper"', sIdx);
const section = html.slice(sIdx, eIdx);

const matches = section.match(/<figure[\s\S]*?<\/figure>/g) || [];
console.log('Figures count:', matches.length);
matches.forEach((m, i) => console.log(`Figure ${i}:`, m));
