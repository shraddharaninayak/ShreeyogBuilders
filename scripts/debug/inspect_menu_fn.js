const fs = require('fs');

const js = fs.readFileSync('public/_nuxt/default.ea02c3da.js', 'utf8');

// Find function _ or const _
const regex = /const _=|\bfunction _\(/g;
let m;
while ((m = regex.exec(js)) !== null) {
  console.log(js.slice(m.index, m.index + 200));
}
