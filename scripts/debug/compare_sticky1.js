const fs = require('fs');
const orig = fs.readFileSync('scripts/debug/orig_objects.html', 'utf8');
const curr = fs.readFileSync('scripts/debug/curr_objects.html', 'utf8');

const s1Orig = orig.indexOf('sticky-container-1');
const s2Orig = orig.indexOf('sticky-container-2');
const s1Curr = curr.indexOf('sticky-container-1');
const s2Curr = curr.indexOf('sticky-container-2');

console.log('--- sticky-container-1 ORIG ---');
console.log(orig.slice(s1Orig, s2Orig));

console.log('\n--- sticky-container-1 CURR ---');
console.log(curr.slice(s1Curr, s2Curr));
