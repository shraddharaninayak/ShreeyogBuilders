const fs = require('fs');
const path = require('path');

function scanDir(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  for (const f of files) {
    const full = path.join(dir, f.name);
    if (f.isDirectory() && f.name !== 'node_modules' && f.name !== '.git') {
      scanDir(full);
    } else if (f.name.endsWith('.css')) {
      const content = fs.readFileSync(full, 'utf8');
      // Look for .c-welcome or .c-places or .c-objects or .c-updates or .c-people without scoping
      const lines = content.split('\n');
      lines.forEach((l, idx) => {
        if (l.includes('.c-welcome') && !l.includes('[data-v-') && !l.includes('.people-page') && !l.includes('.about-page') && !l.includes('.contact-page')) {
          console.log(`[${full}:${idx+1}] ${l.substring(0, 120)}`);
        }
      });
    }
  }
}

scanDir('public');
