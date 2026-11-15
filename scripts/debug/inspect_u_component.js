const fs = require('fs');

const code = fs.readFileSync('public/_nuxt/people.af477013.js', 'utf8');

const uIdx = code.indexOf('U=m({');
if (uIdx !== -1) {
  console.log('U component:');
  console.log(code.slice(uIdx, uIdx + 1200));
}
