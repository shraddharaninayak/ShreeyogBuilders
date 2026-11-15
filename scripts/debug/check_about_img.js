const fs = require('fs');

const imgPath = 'public/images/about/shreeyog-landmark.webp';
if (fs.existsSync(imgPath)) {
  const buf = fs.readFileSync(imgPath);
  console.log('shreeyog-landmark.webp file size:', buf.length);
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
  }
} else {
  console.log('File does not exist');
}
