const fs = require('fs');

const js = fs.readFileSync('d:/Shreeyogweb/public/_nuxt/places.b37ae0d8.js', 'utf8');

const idx = js.indexOf('PlacesParticles');
if (idx !== -1) {
  console.log('--- PlacesParticles ---');
  console.log(js.substring(idx - 100, idx + 3500));
}
