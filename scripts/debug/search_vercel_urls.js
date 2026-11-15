const fs = require('fs');
const path = require('path');

function searchUrls(dir) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const full = path.join(dir, f);
    if (full.includes('node_modules') || full.includes('.git') || full.includes('.gemini')) continue;
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      searchUrls(full);
    } else if (f.endsWith('.js') || f.endsWith('.json') || f.endsWith('.html') || f.endsWith('.md')) {
      const c = fs.readFileSync(full, 'utf8');
      const matches = c.match(/https?:\/\/[a-zA-Z0-9.-]+\.vercel\.app/g);
      if (matches) {
        console.log(`Found in ${full}:`, matches);
      }
    }
  }
}

searchUrls('.');
