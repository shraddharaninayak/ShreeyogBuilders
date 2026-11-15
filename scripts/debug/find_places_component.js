const fs = require('fs');

const js = fs.readFileSync('public/_nuxt/index.d0184b9b.js', 'utf8');

// Find Places component
const idx = js.indexOf('c-places');
console.log('Places at:', idx);

// Search around idx
console.log(js.substring(idx - 200, idx + 800));
