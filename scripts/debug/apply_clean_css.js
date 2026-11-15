const fs = require('fs');
fs.copyFileSync('public/_nuxt/index.a596e4a8.css', 'public/_nuxt/index.a596e4a8.css.bak');
fs.copyFileSync('scripts/debug/clean_index.css', 'public/_nuxt/index.a596e4a8.css');
console.log('Backed up and wrote clean public/_nuxt/index.a596e4a8.css, size:', fs.statSync('public/_nuxt/index.a596e4a8.css').size);
