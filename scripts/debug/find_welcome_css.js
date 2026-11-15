const fs = require('fs');

const css = fs.readFileSync('public/_nuxt/about.5756c083.css', 'utf8');
const lines = css.split('\n');
console.log('Total lines:', lines.length);

// Let's find rules matching c-welcome
const matches = [];
let idx = 0;
while ((idx = css.indexOf('.c-welcome', idx)) !== -1) {
  const start = Math.max(0, idx - 50);
  const end = Math.min(css.length, idx + 400);
  matches.push(css.slice(start, end));
  idx += 10;
}

console.log('Matches count:', matches.length);
matches.slice(0, 10).forEach((m, i) => {
  console.log(`\n--- Match ${i} ---`);
  console.log(m);
});
