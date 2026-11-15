const fs = require('fs');
const origHtml = fs.readFileSync('references/obsidian_original/obsidianassembly.com/index.html', 'utf8');
const currHtml = fs.readFileSync('public/index.html', 'utf8');

function extractSection(html, startTag) {
  const start = html.indexOf(startTag);
  if (start === -1) return null;
  // find matching or next section
  const next = html.indexOf('<section', start + 10);
  return html.slice(start, next !== -1 ? next : start + 5000);
}

const origObjects = extractSection(origHtml, '<section class="s-section c-objects"');
const currObjects = extractSection(currHtml, '<section class="s-section c-objects"');

console.log('Orig objects length:', origObjects ? origObjects.length : 'not found');
console.log('Curr objects length:', currObjects ? currObjects.length : 'not found');

fs.writeFileSync('scripts/debug/orig_objects.html', origObjects || '', 'utf8');
fs.writeFileSync('scripts/debug/curr_objects.html', currObjects || '', 'utf8');
console.log('Wrote scripts/debug/orig_objects.html and curr_objects.html');
