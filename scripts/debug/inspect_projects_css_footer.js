const fs = require('fs');

const css = fs.readFileSync('public/_nuxt/shreeyog-projects.css', 'utf8');

const matches = css.match(/.{0,50}(?:footer|\.c-footer|\.page-footer).{0,50}/gi);
if (matches) {
  matches.forEach(m => console.log('MATCH:', m));
} else {
  console.log('No footer matches in shreeyog-projects.css');
}
