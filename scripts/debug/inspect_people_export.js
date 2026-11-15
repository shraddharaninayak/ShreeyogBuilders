const fs = require('fs');

const code = fs.readFileSync('public/_nuxt/people.af477013.js', 'utf8');

// Let's inspect the setup and render function of people (the default export)
const lIdx = code.indexOf('L=m({');
if (lIdx !== -1) {
  console.log('L component:');
  console.log(code.slice(lIdx));
}
