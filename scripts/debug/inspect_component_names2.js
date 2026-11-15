const fs = require('fs');
const code = fs.readFileSync('public/_nuxt/index.d0184b9b.js', 'utf8');

['Be', 'st', 'rt', 'Et', 'It'].forEach(name => {
  const reg = new RegExp(`const\\s+${name}\\s*=\\s*G\\(\\{__name:['"]([^'"]+)['"]`, 'g');
  const m = reg.exec(code);
  if (m) {
    console.log(name, '__name:', m[1]);
  } else {
    const idx = code.indexOf(name + '={');
    if (idx !== -1) console.log(name, 'at', code.substring(idx, idx + 60));
  }
});
