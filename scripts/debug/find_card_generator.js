const fs = require('fs');

const files = fs.readdirSync('scripts/updates');
for (const f of files) {
  const p = `scripts/updates/${f}`;
  const c = fs.readFileSync(p, 'utf8');
  if (c.includes('arch-card') || c.includes('featLink')) {
    console.log(`Found in: ${p}`);
  }
}
