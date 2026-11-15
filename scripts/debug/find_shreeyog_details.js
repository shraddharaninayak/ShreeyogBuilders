const fs = require('fs');
const path = require('path');

function searchDir(dir) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    if (f.startsWith('.') || f === 'node_modules' || f === 'obsidianassembly.com') continue;
    const full = path.join(dir, f);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      searchDir(full);
    } else if (f.endsWith('.html') || f.endsWith('.js') || f.endsWith('.json') || f.endsWith('.txt') || f.endsWith('.md')) {
      const content = fs.readFileSync(full, 'utf8');
      if (content.includes('+91') || content.includes('hello@') || content.includes('Nashik') || content.includes('Kale') || content.includes('Office') || content.includes('Road')) {
        const matches = [...content.matchAll(/(?:address|office|road|lane|nagar|complex|nashik|pune|pin|contact|phone|email|\+91)[^<\"'\n]{0,80}/gi)].map(m => m[0].trim());
        if (matches.length > 0) {
          console.log(`\nFile: ${full}`);
          console.log([...new Set(matches)].slice(0, 5));
        }
      }
    }
  }
}

searchDir('d:\\Shreeyogweb');
