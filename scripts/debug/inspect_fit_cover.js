const sharp = require('sharp');
const path = require('path');

const uploadDir = 'C:/Users/supri/.gemini/antigravity/brain/520d8483-c57e-4b14-9265-a28f2302a442/.user_uploaded';

const images = [
  { name: 'b1_tanvi', file: 'media_1794629314838_d3265a7c.jpg' },
  { name: 'b2_aerial', file: 'media_1794629403043_c3339225.jpg' },
  { name: 'b3_modern', file: 'media_1794629480475_de793e92.jpg' },
  { name: 'b4_contemporary', file: 'media_1794629549151_682333a2.jpg' }
];

async function inspectImages() {
  for (const img of images) {
    const fullPath = path.join(uploadDir, img.file);
    const meta = await sharp(fullPath).metadata();
    console.log(`\n=== ${img.name} (${img.file}) ===`);
    console.log(`Original: ${meta.width}x${meta.height}`);
    
    // For 3:4 target (0.75):
    // Target height = 1600, target width = 1200
    // If we fit contain within 1200x1600:
    const scale = Math.min(1200 / meta.width, 1600 / meta.height);
    const fittedW = Math.round(meta.width * scale);
    const fittedH = Math.round(meta.height * scale);
    console.log(`Contain in 1200x1600: ${fittedW}x${fittedH} (bars: V=${1600 - fittedH}px, H=${1200 - fittedW}px)`);

    // If we cover 1200x1600:
    const coverScale = Math.max(1200 / meta.width, 1600 / meta.height);
    const coverW = Math.round(meta.width * coverScale);
    const coverH = Math.round(meta.height * coverScale);
    console.log(`Cover in 1200x1600: ${coverW}x${coverH} (crop: H=${coverW - 1200}px, V=${coverH - 1600}px)`);
  }
}

inspectImages();
