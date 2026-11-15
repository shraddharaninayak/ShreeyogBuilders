const fs = require('fs');
const path = require('path');

function searchForText(dir, text) {
  function walk(curr) {
    if (curr.includes('node_modules') || curr.includes('.git') || curr.includes('.gemini')) return;
    fs.readdirSync(curr, { withFileTypes: true }).forEach(ent => {
      const full = path.join(curr, ent.name);
      if (ent.isDirectory()) {
        walk(full);
      } else if (ent.name.endsWith('.js') || ent.name.endsWith('.html') || ent.name.endsWith('.css')) {
        try {
          const content = fs.readFileSync(full, 'utf8');
          if (content.toLowerCase().includes(text.toLowerCase())) {
            console.log('Found in', full);
            const matches = content.match(new RegExp(`.{0,40}${text}.{0,40}`, 'gi'));
            if (matches) matches.slice(0, 3).forEach(m => console.log('  ', m));
          }
        } catch (e) {}
      }
    });
  }
  walk(dir);
}

searchForText('public', 'imagine possible');
searchForText('public', 'imagine-possible');
