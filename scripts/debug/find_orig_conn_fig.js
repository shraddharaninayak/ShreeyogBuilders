const fs = require('fs');

const orig = fs.readFileSync('references/obsidian_original/obsidianassembly.com/index.html', 'utf8');

const matches = [...orig.matchAll(/class="[^"]*connection-figure[^"]*"/g)];
console.log('connection-figure matches in orig:', matches.length);
matches.forEach(m => {
  console.log(orig.substring(m.index - 50, m.index + 400));
});
