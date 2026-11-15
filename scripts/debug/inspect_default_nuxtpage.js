const fs = require('fs');

const d = fs.readFileSync('public/_nuxt/default.ea02c3da.js', 'utf8');

const pageIdx = d.indexOf('NuxtPage');
if (pageIdx !== -1) {
  console.log(d.substring(pageIdx - 100, pageIdx + 200));
} else {
  // search for router-view or component
  const matches = d.match(/.{0,50}(?:router-view|component\s*:).{0,50}/g);
  if (matches) console.log(matches);
}
