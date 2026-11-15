const fs = require('fs');
const path = require('path');

// Check dimensions of stone-3.webp
const imgPath = 'public/images/home/stone-3.webp';
if (fs.existsSync(imgPath)) {
  const buf = fs.readFileSync(imgPath);
  console.log('stone-3.webp file size:', buf.length);
  // WebP header inspect
  if (buf.slice(0, 4).toString() === 'RIFF' && buf.slice(8, 12).toString() === 'WEBP') {
    console.log('Valid WebP file');
    // VP8 or VP8X chunk
    const chunkType = buf.slice(12, 16).toString();
    console.log('Chunk type:', chunkType);
    if (chunkType === 'VP8X') {
      const width = 1 + buf.readUIntLE(24, 3);
      const height = 1 + buf.readUIntLE(27, 3);
      console.log(`Dimensions: ${width}x${height}`);
    } else if (chunkType === 'VP8 ') {
      const width = buf.readUInt16LE(26) & 0x3fff;
      const height = buf.readUInt16LE(28) & 0x3fff;
      console.log(`Dimensions: ${width}x${height}`);
    } else if (chunkType === 'VP8L') {
      const b0 = buf[21], b1 = buf[22], b2 = buf[23], b3 = buf[24];
      const width = 1 + (((b1 & 0x3f) << 8) | b0);
      const height = 1 + (((b3 & 0xf) << 10) | (b2 << 2) | ((b1 & 0xc0) >> 6));
      console.log(`Dimensions: ${width}x${height}`);
    }
  }
} else {
  console.log('File does not exist:', imgPath);
}
