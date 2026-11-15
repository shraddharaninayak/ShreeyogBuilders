const fs = require('fs');
const path = require('path');

console.log('--- Checking public/places ---');
if (fs.existsSync('d:/Shreeyogweb/public/places')) {
  console.log('public/places exists:', fs.readdirSync('d:/Shreeyogweb/public/places'));
} else {
  console.log('public/places does NOT exist');
}

console.log('--- Checking pages/projects.html ---');
if (fs.existsSync('d:/Shreeyogweb/pages/projects.html')) {
  const content = fs.readFileSync('d:/Shreeyogweb/pages/projects.html', 'utf8');
  console.log('pages/projects.html length:', content.length);
  console.log('Head of pages/projects.html:\n', content.substring(0, 1000));
}

console.log('--- Checking conversation directory for video / recordings ---');
const brainDir = 'C:/Users/supri/.gemini/antigravity/brain/520d8483-c57e-4b14-9265-a28f2302a442';
function findInDir(dir) {
  try {
    for (const f of fs.readdirSync(dir)) {
      const p = path.join(dir, f);
      const stat = fs.statSync(p);
      if (stat.isDirectory()) {
        if (!p.includes('.system_generated')) findInDir(p);
      } else {
        if (/\.(mp4|mov|webm|mkv|png|jpg|jpeg|gif)$/i.test(f)) {
          if (f.toLowerCase().includes('record') || f.toLowerCase().includes('screen') || f.toLowerCase().includes('project') || f.toLowerCase().includes('place')) {
            console.log('Matched file in brain:', p, stat.size, 'bytes');
          }
        }
      }
    }
  } catch (e) {
    console.error(e.message);
  }
}
findInDir(brainDir);
