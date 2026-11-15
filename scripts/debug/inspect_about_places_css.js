const fs = require('fs');

const aboutCss = fs.readFileSync('public/_nuxt/about.5756c083.css', 'utf8');
const lines = aboutCss.split('\n');
lines.forEach((l, i) => {
  if (l.includes('{')) {
    const sel = l.substring(0, l.indexOf('{'));
    if (!sel.includes('[data-v-') && !sel.includes('.about-page') && !sel.startsWith('@')) {
      console.log(`[about.css:${i+1}] ${sel}`);
    }
  }
});

const placesCss = fs.readFileSync('public/_nuxt/places.a8fd09d3.css', 'utf8');
const pLines = placesCss.split('\n');
pLines.forEach((l, i) => {
  if (l.includes('{')) {
    const sel = l.substring(0, l.indexOf('{'));
    if (!sel.includes('[data-v-') && !sel.includes('.places-page') && !sel.startsWith('@')) {
      console.log(`[places.css:${i+1}] ${sel}`);
    }
  }
});
