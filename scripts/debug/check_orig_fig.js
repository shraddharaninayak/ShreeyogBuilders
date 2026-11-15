const fs = require('fs');
const html = fs.readFileSync('obsidianassembly.com/about/index.html', 'utf8');
const match = html.match(/<figure[\s\S]*?<\/figure>/);
if (match) console.log(match[0]);
