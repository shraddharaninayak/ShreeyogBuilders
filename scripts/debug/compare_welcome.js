const fs = require('fs');

const orig = fs.readFileSync('references/obsidian_original/obsidianassembly.com/index.html', 'utf8');
const pub = fs.readFileSync('public/index.html', 'utf8');

function getWelcome(html) {
  const start = html.indexOf('class="c-welcome"');
  const tagStart = html.lastIndexOf('<section', start);
  const end = html.indexOf('class="c-places"');
  const tagEnd = html.lastIndexOf('</section>', end) + 10;
  return html.substring(tagStart, tagEnd);
}

const wOrig = getWelcome(orig);
const wPub = getWelcome(pub);

console.log('Orig welcome length:', wOrig.length);
console.log('Pub welcome length:', wPub.length);
fs.writeFileSync('scripts/debug/orig_welcome.html', wOrig);
fs.writeFileSync('scripts/debug/pub_welcome.html', wPub);
