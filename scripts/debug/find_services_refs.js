const fs = require('fs');

const results = [];
function search(dir) {
  for (const f of fs.readdirSync(dir)) {
    const full = dir + '/' + f;
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      search(full);
    } else if (f.endsWith('.html') || f.endsWith('.js') || f.endsWith('.css')) {
      const content = fs.readFileSync(full, 'utf8');
      if (content.includes('/services') || content.includes('Services') || content.includes('/objects')) {
        results.push({ file: full, hasServices: content.includes('Services'), hasServicesSlash: content.includes('/services'), hasObjects: content.includes('/objects') });
      }
    }
  }
}
search('obsidianassembly.com');
console.log('Results:', results);
