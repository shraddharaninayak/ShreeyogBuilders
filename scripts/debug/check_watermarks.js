const fs = require('fs');
const sharp = require('sharp');

const uploadedImages = [
  { id: 1, file: 'C:/Users/supri/.gemini/antigravity/brain/520d8483-c57e-4b14-9265-a28f2302a442/.user_uploaded/media_1794627159932_0f2ebdf5.jpg', label: 'Lift Lobby' },
  { id: 2, file: 'C:/Users/supri/.gemini/antigravity/brain/520d8483-c57e-4b14-9265-a28f2302a442/.user_uploaded/media_1794627233720_eb117ceb.jpg', label: 'Living' },
  { id: 3, file: 'C:/Users/supri/.gemini/antigravity/brain/520d8483-c57e-4b14-9265-a28f2302a442/.user_uploaded/media_1794627355232_655e09b5.jpg', label: 'Dining Area' },
  { id: 4, file: 'C:/Users/supri/.gemini/antigravity/brain/520d8483-c57e-4b14-9265-a28f2302a442/.user_uploaded/media_1794627579646_3920a247.jpg', label: 'Master Bedroom' },
  { id: 5, file: 'C:/Users/supri/.gemini/antigravity/brain/520d8483-c57e-4b14-9265-a28f2302a442/.user_uploaded/media_1794627712773_1160720c.jpg', label: 'Party Area' },
  { id: 6, file: 'C:/Users/supri/.gemini/antigravity/brain/520d8483-c57e-4b14-9265-a28f2302a442/.user_uploaded/media_1794627846255_b62cca59.jpg', label: 'Open Gym' },
  { id: 7, file: 'C:/Users/supri/.gemini/antigravity/brain/520d8483-c57e-4b14-9265-a28f2302a442/.user_uploaded/media_1794627904954_98fea753.jpg', label: 'Yoga / Meditation' }
];

async function checkWatermarks() {
  for (const img of uploadedImages) {
    const meta = await sharp(img.file).metadata();
    console.log(`${img.label}: ${meta.width}x${meta.height}`);
  }
}
checkWatermarks();
