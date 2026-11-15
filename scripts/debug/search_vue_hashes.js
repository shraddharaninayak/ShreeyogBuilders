const fs = require('fs');

const files = [
  'public/_nuxt/default.dc95e376.css',
  'public/_nuxt/index.a596e4a8.css'
];

for (const f of files) {
  if (fs.existsSync(f)) {
    const css = fs.readFileSync(f, 'utf8');
    let idx = 0;
    while ((idx = css.indexOf('ec47b9e2', idx)) !== -1) {
      console.log(`=== ${f} at ${idx} ===`);
      console.log(css.slice(Math.max(0, idx - 100), Math.min(css.length, idx + 200)));
      idx += 10;
    }
    idx = 0;
    while ((idx = css.indexOf('a41b36d1', idx)) !== -1) {
      console.log(`=== a41b36d1 in ${f} at ${idx} ===`);
      console.log(css.slice(Math.max(0, idx - 100), Math.min(css.length, idx + 200)));
      idx += 10;
    }
  }
}
