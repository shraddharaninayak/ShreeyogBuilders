const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const uploadDir = 'C:/Users/supri/.gemini/antigravity/brain/520d8483-c57e-4b14-9265-a28f2302a442/.user_uploaded/';
const targetDir = 'D:/Shreeyogweb/obsidianassembly.com/images/shreeyog/projects/';

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const mapping = [
  {
    name: 'safalya-tower.webp', // top-left (i-6)
    src: 'media_1794546276598_f0627d52.jpg'
  },
  {
    name: 'chintan.webp', // bottom-left (i-5)
    src: 'media_1794546286479_1a44b4ae.jpg'
  },
  {
    name: 'nisarg.webp', // upper-center (i-1)
    src: 'media_1794546314892_6c05fff3.jpg'
  },
  {
    name: 'safalya-angle.webp', // upper-right (i-2)
    src: 'media_1794546268459_c70f4a9c.jpg'
  },
  {
    name: 'residential-complex.webp', // bottom-right (i-3)
    src: 'media_1794546333368_3e3c3bf7.jpg'
  },
  {
    name: 'shakuntal.webp', // bottom-center (i-4)
    src: 'media_1794546298820_0ddcd310.jpg'
  }
];

async function convertImages() {
  for (const item of mapping) {
    const inputPath = path.join(uploadDir, item.src);
    const outputPath = path.join(targetDir, item.name);
    
    await sharp(inputPath)
      .webp({ quality: 92 })
      .toFile(outputPath);
    
    const stats = fs.statSync(outputPath);
    console.log(`✓ Generated ${item.name} (${stats.size} bytes) from ${item.src}`);
  }
}

convertImages().catch(err => {
  console.error('Error converting images:', err);
  process.exit(1);
});
