const fs = require('fs');

const orig = fs.readFileSync('references/obsidian_original/obsidianassembly.com/index.html', 'utf8');

const idx = orig.indexOf('class="connection-figure"');
console.log(orig.substring(idx - 100, idx + 1500));
