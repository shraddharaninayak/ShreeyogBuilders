const sharp = require('sharp');
const path = require('path');

const uploadDir = 'C:/Users/supri/.gemini/antigravity/brain/520d8483-c57e-4b14-9265-a28f2302a442/.user_uploaded';

const files = [
  'media_1794629314838_d3265a7c.jpg',
  'media_1794629403043_c3339225.jpg',
  'media_1794629480475_de793e92.jpg',
  'media_1794629549151_682333a2.jpg',
  'media_1794629579974_d647c749.jpg'
];

async function inspect() {
  for (const f of files) {
    const p = path.join(uploadDir, f);
    const meta = await sharp(p).metadata();
    console.log(`${f}: ${meta.width}x${meta.height}, aspect: ${(meta.width/meta.height).toFixed(3)}, format: ${meta.format}`);
  }
}

inspect();
