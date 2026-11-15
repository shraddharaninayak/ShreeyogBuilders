const fs = require('fs');
const js = fs.readFileSync('public/_nuxt/index.d0184b9b.js', 'utf8');
const objIdx = js.search(/__name:\s*["']Objects["']/);
console.log(js.slice(objIdx, objIdx + 1500));
