const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const uploadDir = 'C:/Users/supri/.gemini/antigravity/brain/520d8483-c57e-4b14-9265-a28f2302a442/.user_uploaded';
const outDir = 'd:/Shreeyogweb/scripts/debug/crops_test';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const images = [
  { name: 'b1_tanvi', file: 'media_1794629314838_d3265a7c.jpg' },
  { name: 'b2_aerial', file: 'media_1794629403043_c3339225.jpg' },
  { name: 'b3_modern', file: 'media_1794629480475_de793e92.jpg' },
  { name: 'b4_contemporary', file: 'media_1794629549151_682333a2.jpg' }
];

async function generateTests() {
  for (const img of images) {
    const src = path.join(uploadDir, img.file);
    const meta = await sharp(src).metadata();

    // 1. Direct contain on dark/neutral background
    const containDark = await sharp(src)
      .resize(1200, 1600, {
        fit: 'contain',
        background: { r: 18, g: 18, b: 18, alpha: 1 }
      })
      .webp({ quality: 90 })
      .toFile(path.join(outDir, `${img.name}_contain_dark.webp`));

    // 2. Direct contain on warm cream background (matches page #FBF6EE)
    const containCream = await sharp(src)
      .resize(1200, 1600, {
        fit: 'contain',
        background: { r: 251, g: 246, b: 238, alpha: 1 }
      })
      .webp({ quality: 90 })
      .toFile(path.join(outDir, `${img.name}_contain_cream.webp`));

    // 3. Blurred ambient background with sharp contain foreground
    const blurBg = await sharp(src)
      .resize(1200, 1600, { fit: 'cover' })
      .blur(25)
      .modulate({ brightness: 0.65 })
      .toBuffer();

    const fg = await sharp(src)
      .resize(1200, 1600, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .toBuffer();

    await sharp(blurBg)
      .composite([{ input: fg, blend: 'over' }])
      .webp({ quality: 90 })
      .toFile(path.join(outDir, `${img.name}_blurred_fill.webp`));

    // 4. Smart architectural crop (where building is kept 100% top to bottom)
    // For Tanvi (1024x946): can we crop width only (extract 710x946 from center)?
    if (meta.width > meta.height * 0.75) {
      const cropW = Math.round(meta.height * 0.75);
      const cropH = meta.height;
      const left = Math.round((meta.width - cropW) / 2);
      await sharp(src)
        .extract({ left, top: 0, width: cropW, height: cropH })
        .resize(1200, 1600)
        .webp({ quality: 90 })
        .toFile(path.join(outDir, `${img.name}_smart_crop.webp`));
    }
  }
  console.log('Test crops generated successfully in', outDir);
}

generateTests().catch(console.error);
