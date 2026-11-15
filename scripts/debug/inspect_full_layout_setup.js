const fs = require('fs');

const d = fs.readFileSync('public/_nuxt/default.ea02c3da.js', 'utf8');

const tIdx = d.indexOf('-t-transition');
// Go back to the setup( of this component
const prevSetup = d.lastIndexOf('setup(', tIdx);
console.log('Setup length:', tIdx - prevSetup);
console.log(d.substring(prevSetup, tIdx));
