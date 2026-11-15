const fs = require('fs');

// 1. Copy shreeyog-contact.css into people.39d410f5.css
const contactCss = fs.readFileSync('public/_nuxt/shreeyog-contact.css', 'utf8');
fs.writeFileSync('public/_nuxt/people.39d410f5.css', contactCss);
if (fs.existsSync('obsidianassembly.com/_nuxt/people.39d410f5.css')) {
  fs.writeFileSync('obsidianassembly.com/_nuxt/people.39d410f5.css', contactCss);
}
console.log('✓ Successfully populated people.39d410f5.css with shreeyog-contact.css');

// 2. Append shreeyog-projects.css to places.a8fd09d3.css
const projectsCss = fs.readFileSync('public/_nuxt/shreeyog-projects.css', 'utf8');
let placesCss = fs.readFileSync('public/_nuxt/places.a8fd09d3.css', 'utf8');
const marker = '/* SHREEYOG PROJECTS OVERRIDES */';
if (placesCss.includes(marker)) {
  placesCss = placesCss.substring(0, placesCss.indexOf(marker));
}
placesCss += '\n\n' + marker + '\n' + projectsCss;
fs.writeFileSync('public/_nuxt/places.a8fd09d3.css', placesCss);
if (fs.existsSync('obsidianassembly.com/_nuxt/places.a8fd09d3.css')) {
  fs.writeFileSync('obsidianassembly.com/_nuxt/places.a8fd09d3.css', placesCss);
}
console.log('✓ Successfully bundled shreeyog-projects.css into places.a8fd09d3.css');
