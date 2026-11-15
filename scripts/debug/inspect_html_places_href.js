const fs = require('fs');
const path = require('path');

const dirs = ['public', 'pages'];

dirs.forEach(d => {
  if (!fs.existsSync(d)) return;
  function walk(curr) {
    fs.readdirSync(curr, { withFileTypes: true }).forEach(ent => {
      const full = path.join(curr, ent.name);
      if (ent.isDirectory()) {
        walk(full);
      } else if (ent.name.endsWith('.html')) {
        const text = fs.readFileSync(full, 'utf8');
        if (text.includes('/places') || text.includes('\"places\"') || text.includes('\'places\'')) {
          console.log('HTML file with places:', full);
          const matches = text.match(/href=[\"'][^\"']*places[^\"']*[\"']/g);
          if (matches) {
            matches.forEach(m => console.log('   ', m));
          }
        }
      }
    });
  }
  walk(d);
});
