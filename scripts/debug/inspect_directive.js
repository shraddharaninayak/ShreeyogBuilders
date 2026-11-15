const fs = require('fs');

const entry = fs.readFileSync('references/obsidian_original/obsidianassembly.com/_nuxt/entry.6ece3b7b.js', 'utf8');

// Look for directive registration: .directive("string", ...) or similar
const dirMatches = [...entry.matchAll(/\.directive\(["']string["']/g)];
console.log('directive("string") matches:', dirMatches.length);
if (dirMatches.length > 0) {
  dirMatches.forEach(m => {
    console.log(entry.substring(m.index - 50, m.index + 200));
  });
} else {
  // search for "string" in entry
  console.log('Searching for other string references:');
  const re = /["']string["']/g;
  let m, count = 0;
  while ((m = re.exec(entry)) !== null) {
    count++;
    if (count <= 10) {
      console.log(`[${m.index}]:`, entry.substring(Math.max(0, m.index - 40), Math.min(entry.length, m.index + 80)));
    }
  }
}
