const fs = require('fs');

const css = fs.readFileSync('public/_nuxt/shreeyog-projects.css', 'utf8');

function findRules(query) {
  let pos = 0;
  while (true) {
    const idx = css.indexOf(query, pos);
    if (idx === -1) break;
    console.log(`=== Found "${query}" at ${idx} ===`);
    console.log(css.substring(Math.max(0, idx - 50), Math.min(css.length, idx + 350)));
    pos = idx + query.length;
  }
}

findRules('.featured-showcase');
findRules('.featured-content-panel');
findRules('.arch-card');
findRules('.arch-suite');
findRules('.highlighted-stage');
