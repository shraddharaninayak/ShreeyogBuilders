const fs = require('fs');

const content = fs.readFileSync('d:/Shreeyogweb/public/_nuxt/MainFooter.a208a2b7.js', 'utf8');
let pos = 0;
while (true) {
  const idx = content.indexOf('places', pos);
  if (idx === -1) break;
  console.log(content.substring(Math.max(0, idx - 40), Math.min(content.length, idx + 80)).replace(/\n/g, ' '));
  pos = idx + 1;
}
