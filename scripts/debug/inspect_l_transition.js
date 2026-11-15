const fs = require('fs');

const d = fs.readFileSync('public/_nuxt/default.ea02c3da.js', 'utf8');

// Find the component setup that has '-t-transition'
const idx = d.indexOf('-t-transition');
// Go back 2500 chars to find setup
console.log(d.substring(idx - 2500, idx));
