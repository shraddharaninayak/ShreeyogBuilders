const fs = require('fs');

const orig = fs.readFileSync('references/obsidian_original/obsidianassembly.com/_nuxt/index.a596e4a8.css', 'utf8');
const pub = fs.readFileSync('public/_nuxt/index.a596e4a8.css', 'utf8');

console.log('Orig CSS size:', orig.length);
console.log('Pub CSS size: ', pub.length);

// Check if pub simply has orig at start + appended rules
if (pub.startsWith(orig)) {
  console.log('Pub starts with exact orig! Appended length:', pub.length - orig.length);
  console.log('Appended text preview:');
  console.log(pub.substring(orig.length, orig.length + 500));
} else {
  console.log('Pub has modifications inside the file.');
  // find first difference
  for (let i = 0; i < Math.min(orig.length, pub.length); i++) {
    if (orig[i] !== pub[i]) {
      console.log(`First diff at ${i}:`);
      console.log('ORIG:', JSON.stringify(orig.substring(i - 30, i + 60)));
      console.log('PUB: ', JSON.stringify(pub.substring(i - 30, i + 60)));
      break;
    }
  }
}
