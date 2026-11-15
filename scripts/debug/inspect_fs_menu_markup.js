const fs = require('fs');

const html = fs.readFileSync('public/index.html', 'utf8');

// Find the template or markup for full-screen menu
const m = html.match(/<div class="full-screen-menu[\s\S]*?<\/div>/);
if (m) {
  console.log('Found full-screen-menu:', m[0].slice(0, 500));
} else {
  console.log('full-screen-menu is client-rendered by Vue in default.ea02c3da.js');
}

// Let's inspect default.ea02c3da.js for the exact full-screen-menu markup and classes
const js = fs.readFileSync('public/_nuxt/default.ea02c3da.js', 'utf8');
const fsIdx = js.indexOf('full-screen-menu');
if (fsIdx !== -1) {
  console.log('default.ea02c3da.js full-screen-menu:');
  console.log(js.slice(fsIdx - 100, fsIdx + 600));
}
