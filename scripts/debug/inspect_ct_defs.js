const fs = require('fs');
const c = fs.readFileSync('public/_nuxt/index.d0184b9b.js', 'utf8');

['ct', 'ut', 'pt', 'dt', 'gt'].forEach(name => {
  const reg = new RegExp(`const\\s+${name}\\s*=`, 'g');
  const m = reg.exec(c);
  if (m) {
    console.log(name, ':', c.substring(m.index, m.index + 100));
  } else {
    const idx = c.indexOf(name + '={');
    if (idx !== -1) console.log(name, 'at', c.substring(idx, idx + 100));
  }
});
