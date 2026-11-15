const sharp = require('sharp');
const fs = require('fs');

async function inspectAerial() {
  const meta = await sharp('C:/Users/supri/.gemini/antigravity/brain/520d8483-c57e-4b14-9265-a28f2302a442/.user_uploaded/media_1794629403043_c3339225.jpg').metadata();
  console.log('Aerial:', meta);
}
inspectAerial();
