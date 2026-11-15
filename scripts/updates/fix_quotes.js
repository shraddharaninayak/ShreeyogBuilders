const fs = require('fs');
const path = require('path');

const basePath = 'D:/Shreeyogweb/obsidianassembly.com';

// 1. Fix in _nuxt/index.d0184b9b.js
const jsPath = path.join(basePath, '_nuxt/index.d0184b9b.js');
let js = fs.readFileSync(jsPath, 'utf8');

js = js.replace(/20°00'N 73°47'E/g, '20°00’N 73°47’E');
js = js.replace(/Nashik's/g, 'Nashik’s');

// Verify syntax by parsing with new Function or vm
try {
  new Function(js);
  console.log('✓ JS syntax is VALID!');
} catch (e) {
  console.error('JS Syntax Error still present:', e.message);
  // Let's locate where the syntax error is
}

fs.writeFileSync(jsPath, js, 'utf8');
console.log('Saved fixed index.d0184b9b.js');

// 2. Fix in index.html
const htmlPath = path.join(basePath, 'index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

html = html.replace(/20°00'N 73°47'E/g, '20°00’N 73°47’E');
html = html.replace(/Nashik's/g, 'Nashik’s');

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Saved fixed index.html');
