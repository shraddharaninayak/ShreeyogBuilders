const fs = require('fs');
const path = require('path');

function searchDir(dir) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const full = path.join(dir, f);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (!full.includes('node_modules') && !full.includes('.git') && !full.includes('.gemini')) {
        searchDir(full);
      }
    } else if (f.endsWith('.js') || f.endsWith('.vue') || f.endsWith('.json') || f.endsWith('.html') || f.endsWith('.css')) {
      const content = fs.readFileSync(full, 'utf8');
      if (content.includes('about_welcome')) {
        console.log(`Found in: ${full}`);
      }
    }
  }
}

searchDir('.');
