const fs = require('fs');

// Inspect menu drawer markup in index.html
const html = fs.readFileSync('public/index.html', 'utf8');
const menuIdx = html.indexOf('full-screen-menu');
if (menuIdx !== -1) {
  console.log('Found full-screen-menu in index.html:');
  console.log(html.slice(menuIdx - 100, menuIdx + 500));
} else {
  console.log('full-screen-menu not in static index.html; it is rendered by Nuxt/Vue');
}

// Check #ImaginePossible container
console.log('ImaginePossible in index.html:', html.includes('id="ImaginePossible"'));
const ipIdx = html.indexOf('ImaginePossible');
if (ipIdx !== -1) {
  console.log(html.slice(ipIdx - 50, ipIdx + 150));
}
