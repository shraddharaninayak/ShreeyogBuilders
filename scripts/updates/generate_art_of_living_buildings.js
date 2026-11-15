const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const uploadDir = 'C:/Users/supri/.gemini/antigravity/brain/520d8483-c57e-4b14-9265-a28f2302a442/.user_uploaded';
const objInitDir = 'd:/Shreeyogweb/public/images/objects-init';
const shreeyogBuildingsDir = 'd:/Shreeyogweb/public/images/shreeyog/buildings';

if (!fs.existsSync(shreeyogBuildingsDir)) {
  fs.mkdirSync(shreeyogBuildingsDir, { recursive: true });
}

async function processBuildings() {
  console.log('--- Generating Final Building Images for The Art of Living ---');

  // Building 1: Tanvi Residency (media_1794629314838_d3265a7c.jpg: 1024x946)
  // Height = 946, 3:4 width = 946 * 0.75 = 710. Crop horizontally: left = (1024-710)/2 = 157
  const b1Src = path.join(uploadDir, 'media_1794629314838_d3265a7c.jpg');
  const b1Buffer = await sharp(b1Src)
    .extract({ left: 157, top: 0, width: 710, height: 946 })
    .resize(1200, 1600)
    .webp({ quality: 92 })
    .toBuffer();

  // Building 2: Aerial View (media_1794629403043_c3339225.jpg: 1024x677)
  // Height = 677, 3:4 width = 677 * 0.75 = 508. Verified optimal centering: left = 210
  const b2Src = path.join(uploadDir, 'media_1794629403043_c3339225.jpg');
  const b2Buffer = await sharp(b2Src)
    .extract({ left: 210, top: 0, width: 508, height: 677 })
    .resize(1200, 1600)
    .webp({ quality: 92 })
    .toBuffer();

  // Building 3: Modern Luxury (media_1794629480475_de793e92.jpg: 1024x768)
  // Height = 768, 3:4 width = 768 * 0.75 = 576. Crop horizontally: left = (1024-576)/2 = 224
  const b3Src = path.join(uploadDir, 'media_1794629480475_de793e92.jpg');
  const b3Buffer = await sharp(b3Src)
    .extract({ left: 224, top: 0, width: 576, height: 768 })
    .resize(1200, 1600)
    .webp({ quality: 92 })
    .toBuffer();

  // Building 4: Contemporary Avenue (media_1794629549151_682333a2.jpg: 1024x954)
  // Height = 954, 3:4 width = 954 * 0.75 = 716. Crop horizontally: left = (1024-716)/2 = 154
  const b4Src = path.join(uploadDir, 'media_1794629549151_682333a2.jpg');
  const b4Buffer = await sharp(b4Src)
    .extract({ left: 154, top: 0, width: 716, height: 954 })
    .resize(1200, 1600)
    .webp({ quality: 92 })
    .toBuffer();

  // Save to /images/objects-init/:
  // Card 0 (order: 0) uses object-4.webp -> Building 1 (Tanvi)
  // Card 1 (order: 1) uses object-1.webp -> Building 2 (Aerial)
  // Card 2 (order: 2) uses object-2.webp -> Building 3 (Modern)
  // Card 3 (order: 3) uses object-3.webp -> Building 4 (Contemporary)
  fs.writeFileSync(path.join(objInitDir, 'object-4.webp'), b1Buffer);
  fs.writeFileSync(path.join(objInitDir, 'object-1.webp'), b2Buffer);
  fs.writeFileSync(path.join(objInitDir, 'object-2.webp'), b3Buffer);
  fs.writeFileSync(path.join(objInitDir, 'object-3.webp'), b4Buffer);
  console.log('Updated objects-init/object-[1-4].webp');

  // Also save to /images/shreeyog/buildings/
  fs.writeFileSync(path.join(shreeyogBuildingsDir, 'tanvi-residency.webp'), b1Buffer);
  fs.writeFileSync(path.join(shreeyogBuildingsDir, 'aerial-view.webp'), b2Buffer);
  fs.writeFileSync(path.join(shreeyogBuildingsDir, 'modern-luxury.webp'), b3Buffer);
  fs.writeFileSync(path.join(shreeyogBuildingsDir, 'contemporary-avenue.webp'), b4Buffer);
  console.log('Saved to images/shreeyog/buildings/');

  console.log('All building images created successfully!');
}

processBuildings().catch(console.error);
