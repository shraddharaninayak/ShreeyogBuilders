const fs = require('fs');

const css = fs.readFileSync('public/_nuxt/shreeyog-projects.css', 'utf8');

const oIdx = css.indexOf('.c-ongoing-section');
if (oIdx !== -1) {
  console.log(css.substring(oIdx, oIdx + 1500));
}
