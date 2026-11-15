const fs = require('fs');

const js = fs.readFileSync('d:/Shreeyogweb/public/_nuxt/places.b37ae0d8.js', 'utf8');

const compRegex = /__name:\s*"([^"]+)"/g;
let m;
console.log('Component names in places.b37ae0d8.js:');
while ((m = compRegex.exec(js)) !== null) {
  console.log(m[1]);
}
