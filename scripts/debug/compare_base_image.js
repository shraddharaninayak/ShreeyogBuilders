const fs = require('fs');
const orig = fs.readFileSync('references/obsidian_original/obsidianassembly.com/_nuxt/BaseImage.19cf9bf9.js', 'utf8');
const curr = fs.readFileSync('public/_nuxt/BaseImage.19cf9bf9.js', 'utf8');

console.log('Orig length:', orig.length);
console.log('Curr length:', curr.length);
console.log('Equal:', orig === curr);

if (orig !== curr) {
  let diff = 0;
  while (diff < orig.length && orig[diff] === curr[diff]) diff++;
  console.log('Diff at:', diff);
  console.log('Orig:', JSON.stringify(orig.slice(diff, diff + 80)));
  console.log('Curr:', JSON.stringify(curr.slice(diff, diff + 80)));
}
