const fs = require('fs');

const origHtml = fs.readFileSync('obsidianassembly.com/about/index.html', 'utf8');
const start = origHtml.indexOf('class="c-welcome');
if (start !== -1) {
  const sStart = origHtml.lastIndexOf('<section', start);
  const sEnd = origHtml.indexOf('</section>', start) + 10;
  console.log('--- Original Obsidian Welcome HTML ---');
  console.log(origHtml.slice(sStart, sEnd));
}

const origCss = fs.readFileSync('obsidianassembly.com/_nuxt/about.5756c083.css', 'utf8');
const idx = origCss.indexOf('.c-welcome');
console.log('--- Original Obsidian Welcome CSS ---');
console.log(origCss.slice(idx, idx + 1000));
