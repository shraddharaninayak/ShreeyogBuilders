const fs = require('fs');
const path = require('path');

function searchDir(dir, pattern) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      if (f !== 'node_modules' && f !== '.git' && f !== 'references') {
        searchDir(full, pattern);
      }
    } else if (f.endsWith('.js') || f.endsWith('.html') || f.endsWith('.vue')) {
      const content = fs.readFileSync(full, 'utf8');
      if (content.includes(pattern)) {
        console.log(`Found "${pattern}" in: ${full}`);
      }
    }
  }
}

searchDir('public', 'string-lazy=""');
searchDir('public', 'string-lazy');
