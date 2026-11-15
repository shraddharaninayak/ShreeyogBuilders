const fs = require('fs');

const css = fs.readFileSync('public/_nuxt/shreeyog-projects.css', 'utf8');

const matches = css.match(/[a-zA-Z0-9_\-\.#]+\s*>\s*[a-zA-Z0-9_\-\.#]+/g);
if (matches) {
  const directChildMatches = matches.filter(m => m.includes('main') || m.includes('body'));
  console.log('Direct child matches with main or body:', directChildMatches);
} else {
  console.log('No child combinators');
}
