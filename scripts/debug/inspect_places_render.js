const fs = require('fs');
const js = fs.readFileSync('d:/Shreeyogweb/public/_nuxt/index.d0184b9b.js', 'utf8');

const stIdx = js.indexOf('st=G({__name:"Places"');
if (stIdx !== -1) {
  console.log('--- PLACES COMPONENT RENDER FUNCTION ---');
  console.log(js.substring(stIdx, stIdx + 4500));
}
