const fs = require('fs');

const srcDir = 'C:/Users/supri/.gemini/antigravity/brain/de7369ba-4b06-4c99-8075-b1c553f7041c/browser_sandbox/screenshots';
const destDir = 'C:/Users/supri/.gemini/antigravity/brain/520d8483-c57e-4b14-9265-a28f2302a442/contact_qa';
if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

fs.readdirSync(srcDir).forEach(f => {
  if (f.startsWith('contact_qa_')) {
    fs.copyFileSync(srcDir + '/' + f, destDir + '/' + f);
    console.log('Copied ' + f);
  }
});
