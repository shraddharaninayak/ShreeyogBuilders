const fs = require('fs');
const path = require('path');

const dir = 'obsidianassembly.com/_nuxt';
fs.readdirSync(dir).forEach(file => {
  if (file.endsWith('.js')) {
    const content = fs.readFileSync(path.join(dir, file), 'utf8');
    if (content.includes('screen:mobile')) {
      console.log('Found screen:mobile in:', file);
      let idx = 0;
      while ((idx = content.indexOf('screen:mobile', idx)) !== -1) {
        console.log('Context:', content.slice(Math.max(0, idx - 100), Math.min(content.length, idx + 200)));
        idx += 15;
      }
    }
  }
});
