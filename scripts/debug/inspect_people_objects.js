const fs = require('fs');

console.log('--- PEOPLE.AF477013.JS ---');
const p = fs.readFileSync('public/_nuxt/people.af477013.js', 'utf8');
console.log(p.substring(0, 1500));

console.log('--- OBJECTS.03AC39A0.JS ---');
const o = fs.readFileSync('public/_nuxt/objects.03ac39a0.js', 'utf8');
console.log(o.substring(0, 1500));
