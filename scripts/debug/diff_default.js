const fs = require('fs');

const orig = fs.readFileSync('references/obsidian_original/obsidianassembly.com/_nuxt/default.ea02c3da.js', 'utf8');
const pub = fs.readFileSync('public/_nuxt/default.ea02c3da.js', 'utf8');

console.log('Comparing default.ea02c3da.js...');
let diffs = [];
for (let i = 0; i < Math.max(orig.length, pub.length); i++) {
  if (orig[i] !== pub[i]) {
    const s = Math.max(0, i - 40);
    console.log(`Diff at offset ${i}:`);
    console.log('ORIG:', JSON.stringify(orig.substring(s, s + 100)));
    console.log('PUB: ', JSON.stringify(pub.substring(s, s + 100)));
    break;
  }
}
