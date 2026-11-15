const fs = require('fs');
const path = require('path');

const dir = 'public/_nuxt';
for (const f of fs.readdirSync(dir)) {
  if (f.endsWith('.css')) {
    const content = fs.readFileSync(path.join(dir, f), 'utf8');
    if (content.includes('page-footer') || content.includes('after') && content.includes('stone-3')) {
      console.log(`Found in ${f}`);
      let idx = 0;
      while ((idx = content.indexOf('page-footer', idx)) !== -1) {
        console.log(content.slice(Math.max(0, idx - 50), Math.min(content.length, idx + 200)));
        idx += 10;
      }
    }
  }
}
