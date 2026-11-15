const fs = require('fs');

console.log('--- In apply_interactive_map.js ---');
const mapJs = fs.readFileSync('d:/Shreeyogweb/scripts/updates/apply_interactive_map.js', 'utf8');
const mapMatches = mapJs.match(/\{[\s\S]*?name:[\s\S]*?\}/g) || [];
mapMatches.forEach(m => console.log(m.replace(/\s+/g, ' ')));

console.log('\n--- In apply_places_gallery.js ---');
const placesJs = fs.readFileSync('d:/Shreeyogweb/scripts/updates/apply_places_gallery.js', 'utf8');
console.log(placesJs);
