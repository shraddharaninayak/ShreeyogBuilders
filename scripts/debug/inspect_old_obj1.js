const sharp = require('sharp');

async function inspectOld() {
  const meta = await sharp('d:/Shreeyogweb/public/images/objects-init/object-1.webp').metadata();
  console.log('Old object-1.webp:', meta);
}
inspectOld();
