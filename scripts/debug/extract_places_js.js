const fs = require('fs');

const origJs = fs.readFileSync('references/obsidian_original/obsidianassembly.com/_nuxt/index.d0184b9b.js', 'utf8');
const pubJs = fs.readFileSync('public/_nuxt/index.d0184b9b.js', 'utf8');

const placesStartOrig = origJs.indexOf('"c-places"');
const placesEndOrig = origJs.indexOf('"c-places-after"');
console.log('Orig c-places length:', placesEndOrig - placesStartOrig);
fs.writeFileSync('scripts/debug/orig_places_snippet.js', origJs.substring(placesStartOrig - 500, placesEndOrig));

const placesStartPub = pubJs.indexOf('"c-places"');
const placesEndPub = pubJs.indexOf('"c-places-after"');
console.log('Pub c-places length:', placesEndPub - placesStartPub);
fs.writeFileSync('scripts/debug/pub_places_snippet.js', pubJs.substring(placesStartPub - 500, placesEndPub));

console.log('Saved snippets to scripts/debug/');
