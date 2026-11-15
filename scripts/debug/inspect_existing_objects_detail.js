const sharp = require('sharp');
const fs = require('fs');

async function inspectExisting() {
  for (let i = 1; i <= 4; i++) {
    const f = `d:/Shreeyogweb/public/images/objects-init/object-${i}.webp`;
    const meta = await sharp(f).metadata();
    console.log(`object-${i}.webp:`, meta.width, 'x', meta.height, 'channels:', meta.channels, 'hasAlpha:', meta.hasAlpha);
  }
}
inspectExisting();
