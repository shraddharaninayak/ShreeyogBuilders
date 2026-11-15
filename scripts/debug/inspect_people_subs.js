const fs = require('fs');

const code = fs.readFileSync('public/_nuxt/people.af477013.js', 'utf8');

// Find where O, z, J (or H) are defined
console.log('--- Search for O ---');
const idxO = code.lastIndexOf('const O=');
if (idxO !== -1) console.log(code.slice(idxO - 500, idxO + 100));

console.log('--- Search for z ---');
const idxZ = code.lastIndexOf('const z=');
if (idxZ !== -1) console.log(code.slice(idxZ - 800, idxZ + 100));

console.log('--- Search for J or H ---');
const idxH = code.lastIndexOf('const H=');
if (idxH !== -1) console.log(code.slice(idxH, idxH + 600));
