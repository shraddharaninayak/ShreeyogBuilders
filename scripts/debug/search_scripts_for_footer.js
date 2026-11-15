const fs = require('fs');
const path = require('path');

function search(dir) {
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, item.name);
    if (item.isDirectory()) search(full);
    else if (item.name.endsWith('.js')) {
      const c = fs.readFileSync(full, 'utf8');
      if (c.includes('footer-shreeyog-title')) {
        console.log('Found in script:', full);
      }
    }
  }
}

search('scripts');
