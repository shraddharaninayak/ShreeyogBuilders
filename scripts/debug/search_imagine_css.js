const fs = require('fs');
const path = require('path');

function searchCss(dir) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach(ent => {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) searchCss(full);
    else if (ent.name.endsWith('.css')) {
      const text = fs.readFileSync(full, 'utf8');
      if (text.toLowerCase().includes('imagine')) {
        console.log('Found imagine in CSS:', full);
        const matches = text.match(/.{0,40}imagine.{0,40}/gi);
        if (matches) matches.slice(0, 3).forEach(m => console.log('  ', m));
      }
    }
  });
}

searchCss('public');
