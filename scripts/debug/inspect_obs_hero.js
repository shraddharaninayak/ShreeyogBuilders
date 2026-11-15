const fs = require('fs');

const obsHtml = fs.readFileSync('obsidianassembly.com/index.html', 'utf-8');

// Find the welcome section in obsidian
const start = obsHtml.indexOf('class="c-welcome"');
const end = obsHtml.indexOf('</section>', start) + 10;
console.log('Obsidian welcome section:');
console.log(obsHtml.substring(start - 20, end));
