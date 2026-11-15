const fs = require('fs');
const path = require('path');

function inspectHeaders(dir) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      if (f !== 'fav' && f !== 'fonts' && f !== 'images' && f !== 'videos' && f !== '_nuxt' && f !== 'test-orig') {
        inspectHeaders(full);
      }
    } else if (f.endsWith('.html')) {
      const c = fs.readFileSync(full, 'utf8');
      const idx = c.indexOf('<header');
      if (idx !== -1) {
        const end = c.indexOf('</header>', idx);
        console.log(`=== ${full} ===`);
        console.log(c.slice(idx, end + 9));
      }
    }
  }
}
inspectHeaders('public');
