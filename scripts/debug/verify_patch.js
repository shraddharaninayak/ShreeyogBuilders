const fs = require('fs');
const c = fs.readFileSync('public/index.html', 'utf8');
for (let i = 1; i <= 4; i++) {
  console.log(`object-${i}.webp:`, c.includes(`src="/images/objects-init/object-${i}.webp"`));
}
