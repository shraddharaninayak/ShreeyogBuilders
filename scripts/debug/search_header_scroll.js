const fs = require('fs');

function searchHeaderScroll(file) {
  if (!fs.existsSync(file)) return;
  const c = fs.readFileSync(file, 'utf8');
  let idx = 0;
  while ((idx = c.indexOf('scroll', idx)) !== -1) {
    const chunk = c.slice(Math.max(0, idx - 40), idx + 80);
    if (chunk.includes('header') || chunk.includes('nav')) {
      console.log(file, 'at', idx, ':', chunk);
    }
    idx += 6;
  }
}

searchHeaderScroll('public/index.html');
searchHeaderScroll('public/projects/index.html');
searchHeaderScroll('public/about/index.html');
searchHeaderScroll('public/contact/index.html');
searchHeaderScroll('public/_nuxt/default.dc95e376.css');
searchHeaderScroll('public/_nuxt/shreeyog-projects.css');
