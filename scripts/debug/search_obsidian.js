const fs = require('fs');
const path = require('path');

function searchAll(dir, term) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      searchAll(full, term);
    } else {
      const content = fs.readFileSync(full, 'utf8');
      if (content.toLowerCase().includes(term.toLowerCase())) {
        console.log(`Found "${term}" in: ${full}`);
      }
    }
  }
}

searchAll('references/obsidian_original/obsidianassembly.com', 'fox');
searchAll('references/obsidian_original/obsidianassembly.com', 'objects-init');
