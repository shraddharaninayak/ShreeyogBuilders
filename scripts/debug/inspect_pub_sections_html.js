const fs = require('fs');

const pubHtml = fs.readFileSync('public/index.html', 'utf8');

function extractSectionHtml(name) {
  const start = pubHtml.indexOf(`class="${name}"`);
  if (start === -1) return `Section ${name} not found`;
  const tagStart = pubHtml.lastIndexOf('<section', start);
  const tagEnd = pubHtml.indexOf('</section>', start) + 10;
  return pubHtml.substring(tagStart, tagEnd);
}

['c-welcome', 'c-places', 'c-places-after', 'c-objects', 'c-connection'].forEach(sec => {
  const html = extractSectionHtml(sec);
  console.log(`\n================ PUB ${sec} (length: ${html.length}) ================`);
  console.log(html.substring(0, 500) + '...');
  const stringAttrs = [...html.matchAll(/\bstring(-[a-z0-9-]+)?(\s*=\s*"[^"]*")?/gi)].map(m => m[0]);
  console.log(`string attributes in ${sec}:`, stringAttrs.slice(0, 15));
});
