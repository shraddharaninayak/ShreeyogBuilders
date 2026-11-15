const fs = require('fs');
const path = require('path');

function search(dir) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const full = path.join(dir, f);
    if (full.includes('node_modules') || full.includes('.git')) continue;
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      search(full);
    } else if (f.endsWith('.js') || f.endsWith('.json') || f.endsWith('.html') || f.endsWith('.sh') || f.endsWith('.md')) {
      const c = fs.readFileSync(full, 'utf8');
      if (c.includes('Legacy server') || c.includes('legacy server')) {
        console.log(`Found in: ${full}`);
      }
    }
  }
}

search('.');
