const sharp = require('sharp');

async function findBorders() {
  const p5 = 'C:/Users/supri/.gemini/antigravity/brain/520d8483-c57e-4b14-9265-a28f2302a442/.user_uploaded/media_1794546314892_6c05fff3.jpg';
  const { data, info } = await sharp(p5).raw().toBuffer({ resolveWithObject: true });
  
  // Find top, bottom, left, right non-white boundaries (or inner border)
  console.log('info:', info.width, info.height, info.channels);
  
  // Check pixels along center column (x = 512)
  for (let y = 0; y < info.height; y += 10) {
    const idx = (y * info.width + 512) * info.channels;
    const r = data[idx], g = data[idx+1], b = data[idx+2];
    if (r < 240 || g < 240 || b < 240) {
      console.log(`First non-white at y=${y}: rgb(${r},${g},${b})`);
      break;
    }
  }
  
  // From bottom
  for (let y = info.height - 1; y >= 0; y -= 10) {
    const idx = (y * info.width + 512) * info.channels;
    const r = data[idx], g = data[idx+1], b = data[idx+2];
    if (r < 240 || g < 240 || b < 240) {
      console.log(`First non-white from bottom at y=${y}: rgb(${r},${g},${b})`);
      break;
    }
  }
}
findBorders();
