const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const uploadDir = 'C:/Users/supri/.gemini/antigravity/brain/520d8483-c57e-4b14-9265-a28f2302a442/.user_uploaded';
const outDir = 'd:/Shreeyogweb/public/test_crops_img';

async function testFraming() {
  // Building 2 (Aerial, 1024x677)
  // Height = 677, width needed for 3:4 = 508
  // Let's test left = 150, 180, 210, 240
  const b2Path = path.join(uploadDir, 'media_1794629403043_c3339225.jpg');
  for (const left of [150, 180, 210, 240]) {
    await sharp(b2Path)
      .extract({ left, top: 0, width: 508, height: 677 })
      .resize(1200, 1600)
      .webp({ quality: 92 })
      .toFile(path.join(outDir, `b2_crop_left_${left}.webp`));
  }

  // Building 3 (Modern, 1024x768)
  // Height = 768, width needed for 3:4 = 576
  // Center is left = (1024 - 576)/2 = 224
  const b3Path = path.join(uploadDir, 'media_1794629480475_de793e92.jpg');
  for (const left of [180, 224, 260]) {
    await sharp(b3Path)
      .extract({ left, top: 0, width: 576, height: 768 })
      .resize(1200, 1600)
      .webp({ quality: 92 })
      .toFile(path.join(outDir, `b3_crop_left_${left}.webp`));
  }

  console.log('Generated framing variants for B2 and B3.');
}

testFraming().catch(console.error);
