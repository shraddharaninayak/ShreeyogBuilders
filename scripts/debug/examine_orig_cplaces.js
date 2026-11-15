const fs = require('fs');
const origJs = fs.readFileSync('references/obsidian_original/obsidianassembly.com/_nuxt/index.d0184b9b.js', 'utf8');

console.log('--- Original context around offset 27347 ---');
console.log(origJs.slice(27300, 27600));

console.log('\n--- Original context around offset 29000 ---');
console.log(origJs.slice(28950, 29200));

console.log('\n--- Original context around offset 31000 ---');
console.log(origJs.slice(30950, 31300));
