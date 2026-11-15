const fs = require('fs');

const origJs = fs.readFileSync('references/obsidian_original/obsidianassembly.com/_nuxt/index.d0184b9b.js', 'utf8');
const pubJs = fs.readFileSync('public/_nuxt/index.d0184b9b.js', 'utf8');

// Search for setup or render function returning children
const findComponents = (js, label) => {
  console.log(`\n--- ${label} ---`);
  // Look for return statement or template array
  const matches = [...js.matchAll(/\[r\([a-zA-Z0-9_$]+(\s*,\s*[^\]]+)?\)\]/g)];
  matches.forEach(m => console.log('Child array match:', m[0]));

  // Look for section classes in js
  const secMatches = [...js.matchAll(/class\s*:\s*"c-[^"]+"/g)];
  console.log('Section classes defined in JS:', [...new Set(secMatches.map(m => m[0]))]);
};

findComponents(origJs, 'ORIGINAL JS');
findComponents(pubJs, 'PUBLIC JS');
