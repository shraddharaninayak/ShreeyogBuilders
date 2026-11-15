const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const uploadDir = 'C:/Users/supri/.gemini/antigravity/brain/520d8483-c57e-4b14-9265-a28f2302a442/.user_uploaded/';
const targetDir = 'D:/Shreeyogweb/obsidianassembly.com/images/shreeyog/slider/';

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const projects = [
  {
    index: 1,
    name: 'Shree Bramhand',
    file: 'media_1794566336755_46d808dc.jpg',
    base: 'shree-bramhand'
  },
  {
    index: 2,
    name: 'Shree Viswa',
    file: 'media_1794566342891_637d1e5d.jpg',
    base: 'shree-viswa'
  },
  {
    index: 3,
    name: 'Shree Safalya',
    file: 'media_1794566627188_3c536513.jpg',
    base: 'shree-safalya'
  },
  {
    index: 4,
    name: 'Shree Samruddhi Park',
    file: 'media_1794566880683_3a48eda0.jpg',
    base: 'shree-samruddhi-park'
  },
  {
    index: 5,
    name: 'Shree Venkatesh',
    file: 'media_1794567066899_0427b9f9.jpg',
    base: 'shree-venkatesh'
  },
  {
    index: 6,
    name: 'Shree Neelkanth',
    file: 'media_1794567090905_2ef0d304.jpg',
    base: 'shree-neelkanth'
  }
];

async function processAll() {
  for (const p of projects) {
    const srcPath = path.join(uploadDir, p.file);
    const outWebp = path.join(targetDir, `${p.base}.webp`);
    const outJpg = path.join(targetDir, `${p.base}.jpg`);

    // High quality conversion
    await sharp(srcPath)
      .webp({ quality: 95 })
      .toFile(outWebp);

    await sharp(srcPath)
      .jpeg({ quality: 95 })
      .toFile(outJpg);

    const sWebp = fs.statSync(outWebp).size;
    const sJpg = fs.statSync(outJpg).size;
    console.log(`✓ Processed ${p.name} -> ${p.base}.webp (${sWebp} B), ${p.base}.jpg (${sJpg} B)`);
  }
}

processAll().catch(e => {
  console.error(e);
  process.exit(1);
});
