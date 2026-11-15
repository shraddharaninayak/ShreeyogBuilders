const fs = require('fs');
const js = fs.readFileSync('d:/Shreeyogweb/public/_nuxt/index.d0184b9b.js', 'utf8');

const stIdx = js.indexOf('places-sequencer[2]');
if (stIdx !== -1) {
  console.log('--- PLACES COMPONENT RENDER PART 2 ---');
  console.log(js.substring(stIdx - 100, stIdx + 2000));
}
