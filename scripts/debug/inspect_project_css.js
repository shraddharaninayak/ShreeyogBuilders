const fs = require('fs');

const css = fs.readFileSync('public/_nuxt/shreeyog-projects.css', 'utf8');

function findRules(selector) {
  const idx = css.indexOf(selector);
  if (idx !== -1) {
    console.log(`--- ${selector} ---`);
    console.log(css.slice(idx, idx + 300));
  } else {
    console.log(`--- ${selector} NOT found ---`);
  }
}

findRules('.featured-detail-btn');
findRules('.arch-card');
findRules('.arch-link');
