const fs = require('fs');
const js = fs.readFileSync('d:/Shreeyogweb/public/_nuxt/index.d0184b9b.js', 'utf8');

// Find Places component or sequence-controller
const idx = js.indexOf('sequence-controller');
console.log('sequence-controller index in JS:', idx);

if (idx !== -1) {
  console.log('--- CONTEXT AROUND sequence-controller ---');
  console.log(js.substring(Math.max(0, idx - 800), Math.min(js.length, idx + 1200)));
}

// Also search for t = [{ in that vicinity
const placesIdx = js.indexOf('c-places');
console.log('c-places index in JS:', placesIdx);
if (placesIdx !== -1) {
  console.log('--- CONTEXT AROUND c-places ---');
  console.log(js.substring(Math.max(0, placesIdx - 1000), Math.min(js.length, placesIdx + 500)));
}
