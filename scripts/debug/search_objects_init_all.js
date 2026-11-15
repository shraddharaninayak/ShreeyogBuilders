const fs = require('fs');

function searchAll(dir) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const fullPath = dir + '/' + f;
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (f !== 'node_modules' && f !== '.git' && f !== 'references') {
        searchAll(fullPath);
      }
    } else if (f.endsWith('.js') || f.endsWith('.html') || f.endsWith('.css') || f.endsWith('.json')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes('objects-init')) {
        console.log('Found objects-init in:', fullPath);
      }
    }
  }
}

searchAll('d:/Shreeyogweb/public');
