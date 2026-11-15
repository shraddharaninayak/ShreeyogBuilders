const fs = require('fs');
const orig = fs.readFileSync('scripts/debug/orig_objects.html', 'utf8');
const curr = fs.readFileSync('scripts/debug/curr_objects.html', 'utf8');

// Let's inspect the tags inside .sequence
console.log('--- ORIG SEQUENCE ---');
const origSeq = orig.match(/<div class="sequence[\s\S]*?<\/div><div class="sticky-container-1"/);
console.log(origSeq ? origSeq[0].slice(0, 1500) : 'not found');

console.log('--- CURR SEQUENCE ---');
const currSeq = curr.match(/<div class="sequence[\s\S]*?<\/div><div class="sticky-container-1"/);
console.log(currSeq ? currSeq[0].slice(0, 1500) : 'not found');
