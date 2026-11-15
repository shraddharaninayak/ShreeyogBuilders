const fs = require('fs');

const html = fs.readFileSync('public/about/index.html', 'utf8');

const s4 = html.indexOf('<style>.c-welcome[data-v-3d2952d6]');
const s4end = html.indexOf('</style>', s4);
console.log('=== STYLE BLOCK 4 (.c-welcome) ===');
console.log(html.slice(s4, s4end + 8));

const s5 = html.indexOf('<style>.c-brief[data-v-5662d5ad]');
const s5end = html.indexOf('</style>', s5);
console.log('=== STYLE BLOCK 5 (.c-brief) ===');
console.log(html.slice(s5, s5end + 8));
