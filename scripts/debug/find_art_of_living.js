const fs = require('fs');

function search(file) {
  const content = fs.readFileSync(file, 'utf8');
  let pos = 0;
  console.log('=== In file:', file, '===');
  while (true) {
    const idx = content.indexOf('Art', pos);
    if (idx === -1) break;
    const snippet = content.substring(Math.max(0, idx - 100), Math.min(content.length, idx + 200));
    if (snippet.toLowerCase().includes('living')) {
      console.log('Match at ' + idx + ':\n' + snippet + '\n---');
    }
    pos = idx + 1;
  }
}

search('d:/Shreeyogweb/public/index.html');
search('d:/Shreeyogweb/public/_nuxt/index.d0184b9b.js');
