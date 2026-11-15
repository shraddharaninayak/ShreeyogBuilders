const fs = require('fs');

const code = fs.readFileSync('public/_nuxt/people.af477013.js', 'utf8');

const idxH = code.indexOf('H=m({');
if (idxH !== -1) {
  console.log(code.slice(idxH, idxH + 600));
} else {
  console.log('const H not found with H=m({');
  // let's search for "inquiry-form-section"
  const formIdx = code.indexOf('inquiry-form-section');
  console.log(code.slice(formIdx - 200, formIdx + 200));
}
