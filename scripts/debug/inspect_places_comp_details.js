const fs = require('fs');

const js = fs.readFileSync('d:/Shreeyogweb/public/_nuxt/places.b37ae0d8.js', 'utf8');

function inspectComponent(name) {
  const marker = `__name:"${name}"`;
  const idx = js.indexOf(marker);
  if (idx === -1) {
    console.log(`Component ${name} not found`);
    return;
  }
  console.log(`\n=================== COMPONENT: ${name} ===================`);
  console.log(js.substring(idx - 100, Math.min(js.length, idx + 2500)));
}

['PlacesWelcome', 'ImageCircleScatter', 'PlacesParticles', 'PlacesFeatures', 'PlacesCTA', 'places'].forEach(inspectComponent);
