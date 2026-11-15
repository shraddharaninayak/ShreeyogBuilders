const fs = require('fs');
const js = fs.readFileSync('public/_nuxt/index.d0184b9b.js', 'utf8');

const re = /!1\?\$\("",!0\):\(g\(\),Q\(T[\s\S]*?\}\)\)/g;
let m;
let i = 0;
while ((m = re.exec(js)) !== null) {
  console.log(`Slot ${i}:`, m[0].slice(0, 120));
  i++;
}
