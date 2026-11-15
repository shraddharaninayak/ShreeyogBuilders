const fs = require('fs');

function checkFile(path) {
  if (!fs.existsSync(path)) return;
  const content = fs.readFileSync(path, 'utf8');
  if (content.includes('shree-bramhand')) console.log('shree-bramhand in', path);
  if (content.includes('nisarg.webp')) console.log('nisarg.webp in', path);
}

checkFile('d:/Shreeyogweb/public/index.html');
checkFile('d:/Shreeyogweb/public/_nuxt/index.d0184b9b.js');
checkFile('d:/Shreeyogweb/public/_nuxt/places.d0184b9b.js');
