const fs = require('fs');

const html = fs.readFileSync('obsidianassembly.com/contact/index.html', 'utf8');
const styles = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map(m => m[1]);

console.log('=== STYLE 3 (.c-welcome) ===');
console.log(styles[3]);

console.log('=== STYLE 4 (.c-about) ===');
console.log(styles[4]);

console.log('=== STYLE 5 (.c-cta) ===');
console.log(styles[5]);
