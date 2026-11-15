const fs = require('fs');
const orig = fs.readFileSync('scripts/debug/orig_objects.html', 'utf8');
const curr = fs.readFileSync('scripts/debug/curr_objects.html', 'utf8');

const s2Orig = orig.indexOf('sticky-container-2');
const s2Curr = curr.indexOf('sticky-container-2');

console.log('--- sticky-container-2 ORIG ---');
console.log(orig.slice(s2Orig));

console.log('\n--- sticky-container-2 CURR ---');
console.log(curr.slice(s2Curr));
