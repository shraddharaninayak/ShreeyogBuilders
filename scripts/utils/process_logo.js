const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const uploadDir = 'C:/Users/supri/.gemini/antigravity/brain/520d8483-c57e-4b14-9265-a28f2302a442/.user_uploaded';
const logoPath = path.join(uploadDir, 'media_1794494845277_2db44d25.png');

async function processLogo() {
  console.log('Generating crisp luxury Shreeyog logo...');

  // Step 1: Crop tightly to logo content [38, 27] to [230, 139] -> 193 x 113
  // Add 4px padding so edges have room
  const cropped = await sharp(logoPath)
    .extract({ left: 34, top: 23, width: 201, height: 121 })
    .toBuffer();

  // Step 2: Upscale 4x with lanczos3 to 804 x 484
  const upscaledBuffer = await sharp(cropped)
    .resize(804, 484, { kernel: 'lanczos3' })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { data, info } = upscaledBuffer;
  const outHero = Buffer.alloc(data.length);
  const outOriginal = Buffer.alloc(data.length);

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    const isRed = (r - g > 35 && r - b > 35 && r > 120);
    const isYellow = (r > 150 && g > 130 && b < 110 && (r - b > 40));

    if (isYellow) {
      // Golden yellow dot
      const alpha = Math.min(255, Math.max(0, Math.round((255 - b) * 1.6)));
      outHero[i] = 255;
      outHero[i + 1] = 215;
      outHero[i + 2] = 0;
      outHero[i + 3] = alpha;

      outOriginal[i] = r;
      outOriginal[i + 1] = g;
      outOriginal[i + 2] = b;
      outOriginal[i + 3] = alpha;
    } else if (isRed) {
      // Vibrant crimson/ruby red script
      const darkness = 255 - Math.round((g + b) / 2);
      const alpha = Math.min(255, Math.max(0, Math.round(darkness * 1.35)));
      outHero[i] = 230;
      outHero[i + 1] = 36;
      outHero[i + 2] = 42;
      outHero[i + 3] = alpha;

      outOriginal[i] = r;
      outOriginal[i + 1] = g;
      outOriginal[i + 2] = b;
      outOriginal[i + 3] = alpha;
    } else {
      // Charcoal/black text: B. M. KALE, Builders & Land Developers, Since - 1992
      const brightness = (r * 0.299 + g * 0.587 + b * 0.114);
      if (brightness < 240) {
        let alpha = Math.round(((240 - brightness) / 205) * 255);
        // Boost text weight slightly for high visibility on dark background
        alpha = Math.min(255, Math.round(Math.pow(alpha / 255, 0.72) * 255));
        
        // Pure crisp white for hero
        outHero[i] = 255;
        outHero[i + 1] = 255;
        outHero[i + 2] = 255;
        outHero[i + 3] = alpha;

        // Dark charcoal for original
        outOriginal[i] = 35;
        outOriginal[i + 1] = 31;
        outOriginal[i + 2] = 32;
        outOriginal[i + 3] = alpha;
      } else {
        outHero[i] = 0;
        outHero[i + 1] = 0;
        outHero[i + 2] = 0;
        outHero[i + 3] = 0;

        outOriginal[i] = 0;
        outOriginal[i + 1] = 0;
        outOriginal[i + 2] = 0;
        outOriginal[i + 3] = 0;
      }
    }
  }

  const outDir = 'D:/Shreeyogweb/obsidianassembly.com/images/shreeyog';
  fs.mkdirSync(outDir, { recursive: true });

  await sharp(outHero, { raw: { width: 804, height: 484, channels: 4 } })
    .png()
    .toFile(path.join(outDir, 'logo-hero.png'));

  await sharp(outHero, { raw: { width: 804, height: 484, channels: 4 } })
    .webp({ quality: 100 })
    .toFile(path.join(outDir, 'logo-hero.webp'));

  await sharp(outOriginal, { raw: { width: 804, height: 484, channels: 4 } })
    .png()
    .toFile(path.join(outDir, 'logo-original.png'));

  console.log('Successfully generated high-contrast logo files at:', outDir);
}

processLogo().catch(console.error);
