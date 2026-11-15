const fs = require('fs');

const css = fs.readFileSync('public/_nuxt/shreeyog-projects.css', 'utf8');

const hIdx = css.indexOf('.c-highlighted-section');
if (hIdx !== -1) {
  console.log(css.substring(hIdx, hIdx + 1500));
}
