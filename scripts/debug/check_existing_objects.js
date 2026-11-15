const sharp = require('sharp');
const fs = require('fs');

async function check() {
  for (let i = 1; i <= 4; i++) {
    const p = `d:/Shreeyogweb/public/images/objects-init/object-${i}.webp`;
    if (fs.existsSync(p)) {
      const meta = await sharp(p).metadata();
      console.log(`object-${i}.webp: ${meta.width}x${meta.height}, format: ${meta.format}`);
    }
  }
}
check();
