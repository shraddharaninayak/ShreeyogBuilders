const fs = require('fs');

const d = fs.readFileSync('public/_nuxt/default.ea02c3da.js', 'utf8');

const setupIdx = d.indexOf('setup(');
console.log(d.substring(setupIdx, setupIdx + 1500));
