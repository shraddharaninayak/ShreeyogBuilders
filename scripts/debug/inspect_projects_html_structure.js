const fs = require('fs');

const p = fs.readFileSync('public/projects/index.html', 'utf8');

console.log('--- HEAD ---');
const headEnd = p.indexOf('</head>');
console.log(p.substring(0, Math.min(1000, headEnd)));

console.log('--- BODY START ---');
const bodyStart = p.indexOf('<body');
console.log(p.substring(bodyStart, bodyStart + 1000));

console.log('--- FOOTER / END OF BODY ---');
const bodyEnd = p.indexOf('</body>');
console.log(p.substring(Math.max(0, bodyEnd - 1500), bodyEnd + 7));
