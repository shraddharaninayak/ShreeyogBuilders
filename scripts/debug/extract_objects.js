const fs = require('fs');
const origHtml = fs.readFileSync('references/obsidian_original/obsidianassembly.com/index.html', 'utf8');
const currHtml = fs.readFileSync('public/index.html', 'utf8');

function extractTag(html, tagStart) {
  const start = html.indexOf(tagStart);
  if (start === -1) return null;
  const nextSection = html.indexOf('<section', start + 10);
  return html.slice(start, nextSection !== -1 ? nextSection : start + 30000);
}

const origObj = extractTag(origHtml, '<section class="c-objects"');
const currObj = extractTag(currHtml, '<section class="c-objects"');

console.log('Orig length:', origObj ? origObj.length : 0);
console.log('Curr length:', currObj ? currObj.length : 0);

fs.writeFileSync('scripts/debug/orig_objects.html', origObj || '', 'utf8');
fs.writeFileSync('scripts/debug/curr_objects.html', currObj || '', 'utf8');
