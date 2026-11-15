const fs = require('fs');
const html = fs.readFileSync('d:/Shreeyogweb/public/index.html', 'utf8');

const idx = html.indexOf('<section class="c-objects"');
console.log('<section class="c-objects" idx:', idx);
if (idx !== -1) {
  console.log(html.substring(idx, idx + 4000));
} else {
  // Try searching for class="c-objects"
  const idx2 = html.indexOf('class="c-objects"');
  console.log('class="c-objects" idx:', idx2);
  if (idx2 !== -1) {
    console.log(html.substring(idx2 - 20, idx2 + 4000));
  }
}
