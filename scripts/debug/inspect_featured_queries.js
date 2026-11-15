const fs = require('fs');

const css = fs.readFileSync('public/_nuxt/shreeyog-projects.css', 'utf8');

const queries = ['featured-content', 'featured-action', 'satellite-card', 'sat-1', 'featuredShowcase'];
queries.forEach(q => {
  const i = css.indexOf(q);
  console.log(`Query "${q}" at index ${i}`);
  if (i !== -1) {
    console.log(css.substring(i, i + 400));
    console.log('-----------------');
  }
});
