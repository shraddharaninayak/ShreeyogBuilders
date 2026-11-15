const fs = require('fs');
const path = require('path');

const dir = 'references/obsidian_original/obsidianassembly.com/_nuxt';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.css'));
for (const f of files) {
  const content = fs.readFileSync(path.join(dir, f), 'utf-8');
  if (content.includes('e764b164')) {
    console.log('Found e764b164 in:', f);
    let pos = 0;
    while ((pos = content.indexOf('e764b164', pos)) !== -1) {
      console.log(content.substring(Math.max(0, pos - 50), Math.min(content.length, pos + 250)));
      pos += 1;
    }
  }
}
