const fs = require('fs');
const path = require('path');

function getImages(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const item of list) {
    const full = path.join(dir, item);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      results = results.concat(getImages(full));
    } else if (/\.(jpg|jpeg|png|webp|svg)$/i.test(item)) {
      results.push(full.replace('obsidianassembly.com', ''));
    }
  }
  return results;
}

const images = getImages('obsidianassembly.com/images');
console.log('Total images:', images.length);
console.log('Shreeyog images:', images.filter(i => i.includes('shreeyog') || i.includes('places') || i.includes('gallery')));
