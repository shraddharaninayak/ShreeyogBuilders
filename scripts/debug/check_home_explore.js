const fs = require('fs');

const html = fs.readFileSync('public/index.html', 'utf8');
const regex = /(?:<[^>]*>)?(?:[^<]{0,50})?(?:Explore|View Project)(?:[^<]{0,50})?(?:<\/[^>]*>)?/gi;
const matches = [];
let m;
while ((m = regex.exec(html)) !== null) {
  matches.push(m[0].trim());
}
console.log('Matches in public/index.html:', matches);
