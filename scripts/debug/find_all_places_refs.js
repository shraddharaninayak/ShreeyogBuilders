const fs = require('fs');
const path = require('path');

function search(dir, extFilter = ['.js', '.html']) {
  const results = [];
  function walk(curr) {
    if (curr.includes('node_modules') || curr.includes('.git') || curr.includes('.gemini')) return;
    const items = fs.readdirSync(curr, { withFileTypes: true });
    for (const item of items) {
      const full = path.join(curr, item.name);
      if (item.isDirectory()) {
        walk(full);
      } else if (extFilter.some(ext => item.name.endsWith(ext))) {
        try {
          const content = fs.readFileSync(full, 'utf8');
          if (content.includes('/places') || content.includes('\"places\"') || content.includes('\'places\'')) {
            results.push(full);
          }
        } catch (e) {}
      }
    }
  }
  walk(dir);
  return results;
}

const files = search('.');
console.log('Files with /places or "places":');
files.forEach(f => console.log(' -', f));
