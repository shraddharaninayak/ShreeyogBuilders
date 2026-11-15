const fs = require('fs');
const files = fs.readdirSync('public/_nuxt');
for (const file of files) {
  if (file.endsWith('.css')) {
    const content = fs.readFileSync(`public/_nuxt/${file}`, 'utf8');
    if (content.includes('grid-column') && content.includes('--left')) {
      console.log(`Found in public/_nuxt/${file}`);
      const idx = content.indexOf('grid-column');
      console.log(content.slice(Math.max(0, idx - 100), Math.min(content.length, idx + 400)));
    }
  }
}
