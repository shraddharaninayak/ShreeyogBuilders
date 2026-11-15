const fs = require('fs');

function search(file) {
  const content = fs.readFileSync(file, 'utf8');
  let pos = 0;
  console.log('=== In file:', file, '===');
  while (true) {
    const idx = content.indexOf('places-sequencer', pos);
    if (idx === -1) break;
    console.log(content.substring(Math.max(0, idx - 40), Math.min(content.length, idx + 80)));
    pos = idx + 1;
  }
}

search('d:/Shreeyogweb/public/_nuxt/index.d0184b9b.js');
search('d:/Shreeyogweb/public/index.html');
