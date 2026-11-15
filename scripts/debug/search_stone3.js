const fs = require('fs');

const files = [
  'public/index.html',
  'public/_nuxt/default.dc95e376.css',
  'public/_nuxt/index.a596e4a8.css',
  'public/_nuxt/entry.6ece3b7b.js'
];

for (const file of files) {
  if (fs.existsSync(file)) {
    const content = fs.readFileSync(file, 'utf8');
    let idx = 0;
    while ((idx = content.indexOf('stone-3', idx)) !== -1) {
      console.log(`=== ${file} at ${idx} ===`);
      console.log(content.slice(Math.max(0, idx - 150), Math.min(content.length, idx + 250)));
      idx += 10;
    }
  }
}
