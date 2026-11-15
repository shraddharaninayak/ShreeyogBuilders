const fs = require('fs');
const path = require('path');

function searchAll(dir) {
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, item.name);
    if (item.isDirectory() && item.name !== 'node_modules' && item.name !== '.git') {
      searchAll(full);
    } else if (item.name.endsWith('.css') || item.name.endsWith('.html') || item.name.endsWith('.js')) {
      const content = fs.readFileSync(full, 'utf8');
      if (content.includes('footer-shreeyog-brand-logo')) {
        console.log('Found in:', full);
      }
    }
  }
}

searchAll('.');
