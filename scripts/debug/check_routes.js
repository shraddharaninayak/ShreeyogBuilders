const fs = require('fs');

const entry = fs.readFileSync('public/_nuxt/entry.6ece3b7b.js', 'utf8');

const regex = /\{[^{}]*name:"([^"]*)"[^{}]*path:"([^"]*)"[^{}]*component:([^,}]+)[^{}]*\}/g;
let m;
while ((m = regex.exec(entry)) !== null) {
  console.log(`Route name: ${m[1]}, path: ${m[2]}, component: ${m[3]}`);
}

// Also check imports of people
const peopleImports = entry.match(/people\.[a-z0-9]+\.js/g);
console.log('people imports:', peopleImports);
