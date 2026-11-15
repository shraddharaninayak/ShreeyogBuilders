const fs = require('fs');
const path = require('path');

function listImgs(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).map(f => path.join(dir, f).replace(/\\/g, '/'));
}

console.log('--- Images in shreeyog/projects ---');
console.log(listImgs('d:/Shreeyogweb/public/images/shreeyog/projects'));

console.log('\n--- Images in shreeyog/slider ---');
console.log(listImgs('d:/Shreeyogweb/public/images/shreeyog/slider'));

console.log('\n--- Images in shreeyog/buildings ---');
console.log(listImgs('d:/Shreeyogweb/public/images/shreeyog/buildings'));
