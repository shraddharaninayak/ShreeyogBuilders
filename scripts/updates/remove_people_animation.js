const fs = require('fs');

console.log('=== REMOVING PEOPLE SILHOUETTE SECTION COMPLETELY ===');

// 1. Update _nuxt/index.d0184b9b.js
const jsPath = 'obsidianassembly.com/_nuxt/index.d0184b9b.js';
let js = fs.readFileSync(jsPath, 'utf8');

const targetJs = '[r(t),r(n),r(o),r(l),r(m),r(R),r(v,{home:"",id:"index"})]';
const replJs = '[r(t),r(n),r(o),r(l),r(m),r(v,{home:"",id:"index"})]';

if (js.includes(targetJs)) {
  js = js.replace(targetJs, replJs);
  fs.writeFileSync(jsPath, js, 'utf8');
  console.log('Successfully updated _nuxt/index.d0184b9b.js: removed r(R) (People component)');
} else {
  console.error('Target JS pattern not found in', jsPath);
}

// 2. Update obsidianassembly.com/index.html
const htmlPath = 'obsidianassembly.com/index.html';
let html = fs.readFileSync(htmlPath, 'utf8');

const startTag = '<section class="c-people"';
const startIdx = html.indexOf(startTag);
if (startIdx !== -1) {
  const endTag = '</section>';
  const endIdx = html.indexOf(endTag, startIdx) + endTag.length;
  html = html.substring(0, startIdx) + html.substring(endIdx);
  fs.writeFileSync(htmlPath, html, 'utf8');
  console.log('Successfully removed <section class="c-people">...</section> from index.html');
} else {
  console.log('c-people not found in index.html (already removed?)');
}

// 3. Update CSS in index.a596e4a8.css
const cssPath = 'obsidianassembly.com/_nuxt/index.a596e4a8.css';
let css = fs.readFileSync(cssPath, 'utf8');
const hideCss = '\n.c-people{display:none!important;visibility:hidden!important;height:0!important;margin:0!important;padding:0!important;overflow:hidden!important;pointer-events:none!important}\n';
css += hideCss;
fs.writeFileSync(cssPath, css, 'utf8');
console.log('Successfully added .c-people hide rule to index.a596e4a8.css');

// 4. Verify no remaining c-people markup in index.html
const verifyHtml = fs.readFileSync(htmlPath, 'utf8');
console.log('Verify c-people in index.html:', verifyHtml.includes('class="c-people"'));

console.log('=== REMOVAL COMPLETE ===');
