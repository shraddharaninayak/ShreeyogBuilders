const fs = require('fs');

const js = fs.readFileSync('d:/Shreeyogweb/public/_nuxt/places.b37ae0d8.js', 'utf8');
console.log('places.b37ae0d8.js length:', js.length);

// Let's print out what strings, components, titles are in places.b37ae0d8.js
const stringMatches = js.match(/"([^"\\]*(\\.[^"\\]*)*)"/g) || [];
const uniqueStrings = [...new Set(stringMatches.map(s => s.slice(1, -1)))];
console.log('Sample strings in places.b37ae0d8.js:');
const interesting = uniqueStrings.filter(s => s.length > 5 && s.length < 100 && /[a-zA-Z]/.test(s));
console.log(interesting.slice(0, 40));
