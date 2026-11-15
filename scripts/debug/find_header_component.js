const fs = require('fs');
const path = require('path');
const dir = 'references/obsidian_original/obsidianassembly.com/_nuxt';
fs.readdirSync(dir).filter(f => f.endsWith('.js')).forEach(f => {
  const c = fs.readFileSync(path.join(dir, f), 'utf8');
  if (c.includes('81ce8483')) {
    console.log(f, 'contains 81ce8483!');
    let idx = 0;
    while ((idx = c.indexOf('81ce8483', idx)) !== -1) {
      console.log('  at', idx, ':', c.slice(Math.max(0, idx - 40), idx + 100));
      idx += 8;
    }
  }
});
