const fs = require('fs');
const code = fs.readFileSync('public/_nuxt/index.d0184b9b.js', 'utf8');

['Fe', 'it', 'at', 'Lt', 'qt', 'Le'].forEach(name => {
  // Find "const " + name + "=" or "name="
  const reg = new RegExp(`const\\s+${name}\\s*=\\s*j\\(([^,\\]]+)`, 'g');
  const m = reg.exec(code);
  if (m) {
    console.log(name, 'component definition wrap:', m[1]);
    // find what m[1] has as __name
    const regName = new RegExp(`const\\s+${m[1]}\\s*=\\s*G\\(\\{__name:['"]([^'"]+)['"]`, 'g');
    const m2 = regName.exec(code);
    if (m2) {
      console.log('  -> __name:', m2[1]);
    }
  } else {
    // maybe defined differently
    const reg2 = new RegExp(`const\\s+${name}\\s*=`, 'g');
    let m3 = reg2.exec(code);
    if (m3) {
      console.log(name, 'defined at:', m3.index, code.substring(m3.index, m3.index + 80));
    }
  }
});
