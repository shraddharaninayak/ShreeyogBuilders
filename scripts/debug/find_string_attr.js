const fs = require('fs');

const entry = fs.readFileSync('references/obsidian_original/obsidianassembly.com/_nuxt/entry.6ece3b7b.js', 'utf8');

['string-id', 'string-copy-from', 'string-enter-vp', 'string-repeat', 'string-offset-top', 'string-self-disable', 'string-key'].forEach(k => {
  const idx = entry.indexOf(k);
  console.log(k, 'at', idx);
  if (idx !== -1) {
    console.log(entry.substring(idx - 60, idx + 120));
  }
});
