const fs = require('fs');

const js = fs.readFileSync('public/_nuxt/default.ea02c3da.js', 'utf8');

// Find where _ is defined in setup of default
const idx = js.indexOf('onClick:t[1]||(t[1]=l=>_())');
console.log('Context of _() call:');
console.log(js.slice(idx - 300, idx + 100));

// Find definition of _
const setupIdx = js.indexOf('setup(g){');
if (setupIdx !== -1) {
  console.log('Setup start:');
  console.log(js.slice(setupIdx, setupIdx + 600));
}
