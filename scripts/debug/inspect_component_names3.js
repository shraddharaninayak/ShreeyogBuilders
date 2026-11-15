const fs = require('fs');
const code = fs.readFileSync('public/_nuxt/index.d0184b9b.js', 'utf8');

['Be', 'st', 'rt', 'Et', 'It'].forEach(name => {
  let idx = 0;
  while ((idx = code.indexOf(name, idx)) !== -1) {
    if (code.substring(idx - 10, idx + name.length + 10).includes('const ' + name) ||
        code.substring(idx - 10, idx + name.length + 10).includes(name + '=')) {
      console.log(name, ':', code.substring(idx - 10, idx + 80));
      break;
    }
    idx += name.length;
  }
});
