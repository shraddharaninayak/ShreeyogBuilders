const fs = require('fs');

const obsCss = fs.readFileSync('obsidianassembly.com/_nuxt/index.a596e4a8.css', 'utf-8');
const pubCss = fs.readFileSync('public/_nuxt/index.a596e4a8.css', 'utf-8');

console.log('obsCss length:', obsCss.length);
console.log('pubCss length:', pubCss.length);
console.log('Are they identical?', obsCss === pubCss);
