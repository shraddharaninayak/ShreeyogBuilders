const fs = require('fs');

const css = fs.readFileSync('public/_nuxt/shreeyog-projects.css', 'utf8');

const cIdx = css.indexOf('.c-completed-section');
if (cIdx !== -1) {
  console.log(css.substring(cIdx, cIdx + 1500));
}
