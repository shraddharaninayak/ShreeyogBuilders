const fs = require('fs');
const html = fs.readFileSync('scripts/debug/chrome_dom.html', 'utf8');
const start = html.indexOf('<section class="c-objects"');
const end = html.indexOf('</section>', start);
const snippet = html.slice(start, end + 10);
// print tag names and classes
const lines = [];
snippet.replace(/<([a-z0-9]+)([^>]*)>/gi, (match, tag, attrs) => {
  const cls = (attrs.match(/class="([^"]*)"/) || [])[1] || '';
  const id = (attrs.match(/id="([^"]*)"/) || [])[1] || '';
  const string = (attrs.match(/string(?:="([^"]*)")?/) || [])[0] || '';
  lines.push(`${tag} .${cls.split(' ').join('.')} ${id ? '#' + id : ''} [${string}]`);
});
console.log(lines.join('\n'));
