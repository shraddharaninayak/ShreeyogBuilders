const fs = require('fs');

const pubHtml = fs.readFileSync('public/index.html', 'utf-8');
const obsHtml = fs.readFileSync('obsidianassembly.com/index.html', 'utf-8');

const getSection = (html) => {
  const start = html.indexOf('class="c-welcome"');
  if (start === -1) return null;
  const tagStart = html.lastIndexOf('<section', start);
  const tagEnd = html.indexOf('</section>', start) + 10;
  return html.substring(tagStart, tagEnd);
};

console.log('--- PUBLIC HERO SECTION ---');
console.log(getSection(pubHtml));

console.log('--- OBSIDIAN HERO SECTION ---');
console.log(getSection(obsHtml));
