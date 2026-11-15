const fs = require('fs');

// We can check with image-size or sharp or simple webp header parser
function getWebpSize(buffer) {
  // VP8X chunk
  if (buffer.toString('ascii', 12, 16) === 'VP8X') {
    const width = 1 + buffer.readUIntLE(24, 3);
    const height = 1 + buffer.readUIntLE(27, 3);
    return { width, height };
  }
  // VP8 chunk
  if (buffer.toString('ascii', 12, 16) === 'VP8 ') {
    const width = buffer.readUInt16LE(26) & 0x3fff;
    const height = buffer.readUInt16LE(28) & 0x3fff;
    return { width, height };
  }
  // VP8L chunk
  if (buffer.toString('ascii', 12, 16) === 'VP8L') {
    const b0 = buffer[21];
    const b1 = buffer[22];
    const b2 = buffer[23];
    const b3 = buffer[24];
    const width = 1 + (((b1 & 0x3F) << 8) | b0);
    const height = 1 + (((b3 & 0xF) << 10) | (b2 << 2) | ((b1 & 0xC0) >> 6));
    return { width, height };
  }
  return null;
}

['object-1.webp', 'object-2.webp', 'object-3.webp', 'object-4.webp'].forEach(f => {
  const buf = fs.readFileSync('public/images/objects-init/' + f);
  console.log(f, getWebpSize(buf));
});
