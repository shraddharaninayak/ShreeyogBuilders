const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const uploadDir = 'C:/Users/supri/.gemini/antigravity/brain/520d8483-c57e-4b14-9265-a28f2302a442/.user_uploaded';
const bldgPath = path.join(uploadDir, 'media_1794495022367_ad3a5204.jpg');
const outDir = 'D:/Shreeyogweb/obsidianassembly.com/images/shreeyog';

async function processBuilding() {
  const { data, info } = await sharp(bldgPath)
    .raw()
    .toBuffer({ resolveWithObject: true });

  const width = info.width;
  const height = info.height;
  const channels = info.channels;

  // 1. Clean the center seam around x=348..350
  for (let y = 0; y < height; y++) {
    for (let c = 0; c < channels; c++) {
      // average x=347 and x=351 for 348, 349, 350
      const idxLeft = (y * width + 346) * channels + c;
      const idxRight = (y * width + 352) * channels + c;
      const leftVal = data[idxLeft];
      const rightVal = data[idxRight];

      for (let x = 347; x <= 351; x++) {
        const factor = (x - 346) / 6;
        const interp = Math.round(leftVal * (1 - factor) + rightVal * factor);
        data[(y * width + x) * channels + c] = interp;
      }
    }
  }

  // Save cleaned full building
  const cleanedBuffer = await sharp(data, { raw: { width, height, channels } })
    .jpeg({ quality: 95 })
    .toBuffer();

  // 2. Extract Left Floating Image (Exterior architectural detail)
  // Aspect ratio 22/30 (approx 0.733)
  // Let's crop x: 50..450 (width 400), y: 80..625 (height 545) -> 400/545 = 0.734! Perfect!
  await sharp(cleanedBuffer)
    .extract({ left: 70, top: 70, width: 380, height: 518 })
    .resize(600, 818, { fit: 'cover' })
    .webp({ quality: 90 })
    .toFile(path.join(outDir, 'exterior-detail.webp'));

  console.log('Saved exterior-detail.webp');

  // 3. Central Building Presentation
  // Create an RGBA buffer where the building is cleanly framed and fades softly into the background
  // Dimensions 1000x1000
  // Resize building to fit height ~900, width ~965
  const resizedBldg = await sharp(cleanedBuffer)
    .resize({ height: 950, fit: 'inside' })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const rW = resizedBldg.info.width;
  const rH = resizedBldg.info.height;
  const rData = resizedBldg.data;

  // Let's create an RGBA image where bottom 15% fades softly to transparent so it blends seamlessly with the arch
  for (let y = 0; y < rH; y++) {
    const bottomDist = rH - 1 - y;
    let alphaMult = 1;
    if (bottomDist < 60) {
      alphaMult = bottomDist / 60;
    }
    // Also soft vignette on top sky corners so it blends naturally into the hero background
    for (let x = 0; x < rW; x++) {
      const idx = (y * rW + x) * 4;
      let a = rData[idx + 3] * alphaMult;
      rData[idx + 3] = Math.round(a);
    }
  }

  // Composite onto a 1200x1200 canvas centered
  const finalBuilding = await sharp(rData, { raw: { width: rW, height: rH, channels: 4 } })
    .webp({ quality: 95 })
    .toBuffer();

  await sharp({
    create: {
      width: 1200,
      height: 1200,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    }
  })
    .composite([{ input: finalBuilding, gravity: 'center' }])
    .webp({ quality: 95 })
    .toFile(path.join(outDir, 'building-hero.webp'));

  console.log('Saved building-hero.webp');
}

processBuilding().catch(console.error);
