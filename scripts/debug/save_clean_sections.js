const fs = require('fs');

const html = fs.readFileSync('public/contact/index.html', 'utf8');

function getSection(name) {
  const start = html.indexOf(`<section class="${name}"`);
  if (start === -1) return null;
  const end = html.indexOf('</section>', start) + 10;
  return html.slice(start, end);
}

const welcome = getSection('c-welcome');
const about = getSection('c-about');
const cta = getSection('c-cta');

fs.writeFileSync('scripts/debug/section_welcome.html', welcome || '', 'utf8');
fs.writeFileSync('scripts/debug/section_about.html', about || '', 'utf8');
fs.writeFileSync('scripts/debug/section_cta.html', cta || '', 'utf8');

console.log('welcome len:', welcome ? welcome.length : 0);
console.log('about len:', about ? about.length : 0);
console.log('cta len:', cta ? cta.length : 0);
