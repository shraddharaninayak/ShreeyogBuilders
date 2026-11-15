const fs = require('fs');

const js = fs.readFileSync('public/_nuxt/default.ea02c3da.js', 'utf8');

const idx = js.indexOf('extraClass:"menu"');
// Look backwards for setup
const setupIdx = js.lastIndexOf('setup(', idx);
console.log('Setup of menu component:');
console.log(js.slice(setupIdx, setupIdx + 1000));
