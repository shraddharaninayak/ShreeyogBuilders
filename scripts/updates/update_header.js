const fs = require('fs');

// 1. Update index.html
let html = fs.readFileSync('D:/Shreeyogweb/obsidianassembly.com/index.html', 'utf8');

// Replace header logo link to remove the tagline span
const oldHeaderLogo = '<a href="/" class="-nl" data-v-81ce8483><img src="/images/shreeyog/logo-hero.png" alt="Shreeyog Builders &amp; Land Developers" class="shreeyog-brand-logo" data-v-81ce8483><span class="-mm" data-v-81ce8483>Spaces. Stories. Legacies.</span></a>';
const newHeaderLogo = '<a href="/" class="-nl" data-v-81ce8483><img src="/images/shreeyog/logo-hero.png" alt="Shreeyog Builders &amp; Land Developers" class="shreeyog-brand-logo" data-v-81ce8483></a>';

if (html.includes(oldHeaderLogo)) {
  html = html.replace(oldHeaderLogo, newHeaderLogo);
  console.log('Replaced header logo in index.html');
} else {
  console.log('Old header logo markup not found directly, checking regex...');
  html = html.replace(/<span class="-mm" data-v-81ce8483>Spaces\. Stories\. Legacies\.<\/span>/g, '');
}

// Update shreeyog-brand-logo css in index.html
const oldCssRegex = /\.shreeyog-brand-logo\s*\{[\s\S]*?@media\s*\(max-width:\s*1024px\)\s*\{[\s\S]*?\}\s*\}/;
const newCss = `.shreeyog-brand-logo {
  height: 78px;
  width: auto;
  max-width: 240px;
  object-fit: contain;
  display: block;
  margin-top: -2px;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.45));
  transition: transform 0.3s ease, filter 0.3s ease;
}
.shreeyog-brand-logo:hover {
  transform: scale(1.02);
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.55));
}
@media (max-width: 1024px) {
  .shreeyog-brand-logo {
    height: 56px;
    max-width: 180px;
  }
}
@media (max-width: 768px) {
  .shreeyog-brand-logo {
    height: 48px;
    max-width: 150px;
  }
}`;

if (oldCssRegex.test(html)) {
  html = html.replace(oldCssRegex, newCss);
  console.log('Replaced CSS in index.html');
}

fs.writeFileSync('D:/Shreeyogweb/obsidianassembly.com/index.html', html, 'utf8');
console.log('index.html saved.');

// 2. Update default.ea02c3da.js
let js = fs.readFileSync('D:/Shreeyogweb/obsidianassembly.com/_nuxt/default.ea02c3da.js', 'utf8');
const target = '[o("img",{src:"/images/shreeyog/logo-hero.png",alt:"Shreeyog Builders & Land Developers",class:"shreeyog-brand-logo"},null,-1),o("span",{class:"-mm"},"Spaces. Stories. Legacies.",-1)]';
const replacement = '[o("img",{src:"/images/shreeyog/logo-hero.png",alt:"Shreeyog Builders & Land Developers",class:"shreeyog-brand-logo"},null,-1)]';

const count = js.split(target).length - 1;
console.log('Occurrences found in JS:', count);
js = js.split(target).join(replacement);
fs.writeFileSync('D:/Shreeyogweb/obsidianassembly.com/_nuxt/default.ea02c3da.js', js, 'utf8');
console.log('default.ea02c3da.js saved.');
