const fs = require('fs');
const path = require('path');

const files = fs.readdirSync('public/_nuxt').filter(f => f.endsWith('.js'));
for (const file of files) {
  const content = fs.readFileSync(path.join('public/_nuxt', file), 'utf-8');
  if (content.includes('progress') && (content.includes('--progress') || content.includes('welcome') || content.includes('string-id'))) {
    console.log('Match in file:', file);
  }
}
