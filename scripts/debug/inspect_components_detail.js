const fs = require('fs');

const origJs = fs.readFileSync('references/obsidian_original/obsidianassembly.com/_nuxt/index.d0184b9b.js', 'utf8');

// Let's find all component definitions in origJs
// Typically defined like: const Something = { name: "...", setup(...) } or _sfc_main
// Or in vue minified: const Co = { ... }
// Let's search for string directives and component names
const strings = [...origJs.matchAll(/"c-[^"]+"/g)].map(m => m[0]);
console.log('Class strings in orig index.js:', [...new Set(strings)]);

// Let's look at the main homepage component render:
// Search for `c-welcome` in origJs:
const welcomeIdx = origJs.indexOf('c-welcome');
console.log('c-welcome at:', welcomeIdx);
if (welcomeIdx !== -1) {
  console.log('Snippet around c-welcome:');
  console.log(origJs.substring(welcomeIdx - 150, welcomeIdx + 400));
}

// Search for `c-places` in origJs:
const placesIdx = origJs.indexOf('c-places');
console.log('c-places at:', placesIdx);
if (placesIdx !== -1) {
  console.log('Snippet around c-places:');
  console.log(origJs.substring(placesIdx - 150, placesIdx + 400));
}

// Search for `c-objects` in origJs:
const objectsIdx = origJs.indexOf('c-objects');
console.log('c-objects at:', objectsIdx);
if (objectsIdx !== -1) {
  console.log('Snippet around c-objects:');
  console.log(origJs.substring(objectsIdx - 150, objectsIdx + 400));
}
