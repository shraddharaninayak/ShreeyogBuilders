const fs = require('fs');

const css = fs.readFileSync('public/_nuxt/shreeyog-projects.css', 'utf8');

const heroIdx = css.indexOf('.c-projects-hero');
if (heroIdx !== -1) {
  console.log(css.substring(heroIdx, heroIdx + 600));
}
