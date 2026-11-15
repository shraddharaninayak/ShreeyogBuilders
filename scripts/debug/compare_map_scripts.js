const fs = require('fs');
const html = fs.readFileSync('public/index.html', 'utf8');

const s3 = html.match(/<script>\s*\(function\(\)\s*\{\s*function initShreeyogMap[\s\S]*?<\/script>/i);
const s4 = html.match(/<script id="shreeyog-map-interactive-script"[\s\S]*?<\/script>/i);

console.log('Script 3 full:\n', s3 ? s3[0] : 'none');
console.log('\nScript 4 full:\n', s4 ? s4[0] : 'none');
