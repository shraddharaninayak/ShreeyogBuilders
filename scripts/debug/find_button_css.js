const fs = require('fs');
const path = require('path');
const dir = 'references/obsidian_original/obsidianassembly.com/_nuxt';
fs.readdirSync(dir).filter(f => f.endsWith('.css')).forEach(f => {
  const c = fs.readFileSync(path.join(dir, f), 'utf8');
  let count = 0;
  let idx = 0;
  while ((idx = c.indexOf('.button[data-v-', idx)) !== -1) {
    count++;
    console.log(f, 'has .button[data-v-:', c.slice(idx, idx + 120));
    idx += 15;
  }
  if (!count) {
    while ((idx = c.indexOf('.button{', idx)) !== -1) {
      console.log(f, 'has .button{:', c.slice(idx, idx + 120));
      idx += 8;
    }
  }
});
