const fs = require('fs');
const path = require('path');

function findFiles(dir, matchFn, results = []) {
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.name === 'node_modules' || entry.name === '.git') continue;
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        findFiles(fullPath, matchFn, results);
      } else if (matchFn(entry.name, fullPath)) {
        results.push(fullPath);
      }
    }
  } catch (e) {
    console.error('Error scanning', dir, e.message);
  }
  return results;
}

console.log('--- Video / screen recording files ---');
const videos = findFiles('d:/Shreeyogweb', (name) => /\.(mp4|mov|webm|mkv|avi)$/i.test(name));
console.log(videos);

console.log('\n--- Places / Projects files in public & references ---');
const placesFiles = findFiles('d:/Shreeyogweb', (name) => /(place|project)/i.test(name));
console.log(placesFiles.slice(0, 50));

console.log('\n--- References / brochures ---');
const refFiles = findFiles('d:/Shreeyogweb/references', () => true);
console.log(refFiles);
