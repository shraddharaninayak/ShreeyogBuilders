const sharp = require('sharp');
const path = require('path');

const interiorSrc = 'C:/Users/supri/.gemini/antigravity/brain/520d8483-c57e-4b14-9265-a28f2302a442/shreeyog_luxury_living_room_1794495533471.jpg';
const outPath = 'D:/Shreeyogweb/obsidianassembly.com/images/shreeyog/interior-detail.webp';

async function processInterior() {
  await sharp(interiorSrc)
    .resize(600, 818, { fit: 'cover', position: 'center' })
    .webp({ quality: 90 })
    .toFile(outPath);
  console.log('Saved interior-detail.webp');
}

processInterior().catch(console.error);
