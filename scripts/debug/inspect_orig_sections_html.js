const fs = require('fs');

const origHtml = fs.readFileSync('references/obsidian_original/obsidianassembly.com/index.html', 'utf8');

function extractSectionHtml(name) {
  const start = origHtml.indexOf(`class="${name}"`);
  if (start === -1) return `Section ${name} not found`;
  // find preceding <section or <div
  const tagStart = origHtml.lastIndexOf('<section', start);
  const tagEnd = origHtml.indexOf('</section>', start) + 10;
  return origHtml.substring(tagStart, tagEnd);
}

['c-welcome', 'c-places', 'c-places-after', 'c-objects', 'c-connection'].forEach(sec => {
  const html = extractSectionHtml(sec);
  console.log(`\n================ ${sec} (length: ${html.length}) ================`);
  // print first 600 chars and structure
  console.log(html.substring(0, 500) + '...');
  // check for string attributes
  const stringAttrs = [...html.matchAll(/\bstring(-[a-z0-9-]+)?(\s*=\s*"[^"]*")?/gi)].map(m => m[0]);
  console.log(`string attributes in ${sec}:`, stringAttrs.slice(0, 15));
});
