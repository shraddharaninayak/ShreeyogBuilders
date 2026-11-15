const fs = require('fs');
const path = require('path');

function search(dir) {
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, item.name);
    if (item.isDirectory() && item.name !== 'node_modules' && item.name !== '.git') {
      search(full);
    } else if (item.name.endsWith('.html') || item.name.endsWith('.css')) {
      const c = fs.readFileSync(full, 'utf8');
      if (c.includes('Shreeyog Restored Footer Structure') || c.includes('Shreeyog Footer Customizations')) {
        console.log('Found in:', full);
      }
    }
  }
}

search('public');
search('pages');
