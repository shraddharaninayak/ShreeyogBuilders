const fs = require('fs');

function checkCss(file) {
  const css = fs.readFileSync(file, 'utf8');
  let pos = 0;
  console.log('=== In file:', file, '===');
  while (true) {
    const idx = css.indexOf('object-wrapper', pos);
    if (idx === -1) break;
    console.log(css.substring(idx - 20, idx + 300));
    pos = idx + 1;
  }
}

checkCss('d:/Shreeyogweb/public/_nuxt/index.a596e4a8.css');
if (fs.existsSync('d:/Shreeyogweb/public/_nuxt/objects.ebb82260.css')) {
  checkCss('d:/Shreeyogweb/public/_nuxt/objects.ebb82260.css');
}
