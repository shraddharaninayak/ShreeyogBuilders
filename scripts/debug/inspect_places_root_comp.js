const fs = require('fs');

const js = fs.readFileSync('d:/Shreeyogweb/public/_nuxt/places.b37ae0d8.js', 'utf8');

const lastIdx = js.lastIndexOf('__name:"places"');
console.log('lastIdx:', lastIdx);
if (lastIdx !== -1) {
  console.log(js.substring(lastIdx - 200, Math.min(js.length, lastIdx + 1500)));
}
