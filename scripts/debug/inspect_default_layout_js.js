const fs = require('fs');

function searchJs(file) {
  const content = fs.readFileSync(file, 'utf8');
  let pos = 0;
  console.log('=== In file:', file, '===');
  while (true) {
    const idx = content.indexOf('places', pos);
    if (idx === -1) break;
    const snippet = content.substring(Math.max(0, idx - 40), Math.min(content.length, idx + 80));
    console.log(snippet.replace(/\n/g, ' '));
    pos = idx + 1;
  }
}

searchJs('d:/Shreeyogweb/public/_nuxt/default.ea02c3da.js');
