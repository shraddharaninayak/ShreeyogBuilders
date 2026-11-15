const fs = require('fs');
const html = fs.readFileSync('public/index.html', 'utf8');

const marker = html.match(/<g class="shreeyog-marker-group"[^>]*>/);
console.log('Marker attributes:', marker ? marker[0] : 'not found');
