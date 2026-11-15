const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const uploadDir = 'C:/Users/supri/.gemini/antigravity/brain/520d8483-c57e-4b14-9265-a28f2302a442/.user_uploaded';
const targetDir = 'd:/Shreeyogweb/public/images/shreeyog/interiors';

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const images = [
  {
    src: 'media_1794627233720_eb117ceb.jpg',
    name: 'living-room',
    title: 'Living Room'
  },
  {
    src: 'media_1794627579646_3920a247.jpg',
    name: 'master-bedroom',
    title: 'Master Bedroom'
  },
  {
    src: 'media_1794627355232_655e09b5.jpg',
    name: 'dining-space',
    title: 'Dining Space'
  },
  {
    src: 'media_1794627159932_0f2ebdf5.jpg',
    name: 'residential-lounge',
    title: 'Residential Lounge'
  },
  {
    src: 'media_1794627904954_98fea753.jpg',
    name: 'private-balcony',
    title: 'Private Balcony'
  },
  {
    src: 'media_1794627712773_1160720c.jpg',
    name: 'rooftop-terrace',
    title: 'Rooftop Terrace'
  },
  {
    src: 'media_1794627846255_b62cca59.jpg',
    name: 'fitness-lounge',
    title: 'Fitness Lounge'
  }
];

async function processImages() {
  for (const img of images) {
    const srcPath = path.join(uploadDir, img.src);
    if (!fs.existsSync(srcPath)) {
      console.error(`Source image missing: ${srcPath}`);
      continue;
    }
    const meta = await sharp(srcPath).metadata();
    console.log(`Processing ${img.name}: ${meta.width}x${meta.height}, format: ${meta.format}`);

    // Output WebP
    const webpPath = path.join(targetDir, `${img.name}.webp`);
    await sharp(srcPath)
      .webp({ quality: 92 })
      .toFile(webpPath);
    console.log(`Saved: ${webpPath}`);

    // Output JPG (high quality fallback)
    const jpgPath = path.join(targetDir, `${img.name}.jpg`);
    await sharp(srcPath)
      .jpeg({ quality: 92 })
      .toFile(jpgPath);
    console.log(`Saved: ${jpgPath}`);
  }
  console.log('All 7 images processed successfully!');
}

processImages().catch(err => {
  console.error('Error processing images:', err);
  process.exit(1);
});
