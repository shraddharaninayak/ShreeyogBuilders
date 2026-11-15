const fs = require('fs');

const entryJs = fs.readFileSync('d:/Shreeyogweb/public/_nuxt/entry.6ece3b7b.js', 'utf8');

// Search for route definitions or paths: path:"/places", path:"/about", etc.
const routeMatches = entryJs.match(/path:\s*\"[^\"]+\"/g) || [];
console.log('Route matches in entry.6ece3b7b.js:');
console.log(routeMatches);

// Let's also look for route objects
let pos = 0;
while (true) {
  const idx = entryJs.indexOf('places', pos);
  if (idx === -1) break;
  console.log('Match at ' + idx + ':\n' + entryJs.substring(Math.max(0, idx - 80), Math.min(entryJs.length, idx + 120)) + '\n---');
  pos = idx + 1;
}
