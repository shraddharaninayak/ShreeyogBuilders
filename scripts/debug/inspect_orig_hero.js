const fs = require('fs');

const origHtml = fs.readFileSync('references/obsidian_original/obsidianassembly.com/index.html', 'utf-8');

const start = origHtml.indexOf('class="c-welcome"');
const end = origHtml.indexOf('</section>', start) + 10;
console.log('--- ORIGINAL PRISTINE OBSIDIAN HERO SECTION ---');
console.log(origHtml.substring(start - 20, end));
