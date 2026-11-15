const fs = require('fs');

const f = fs.readFileSync('public/_nuxt/MainFooter.a208a2b7.js', 'utf8');

const exportMatches = f.match(/export\s*\{[^}]*\}/g);
console.log('MainFooter exports:', exportMatches);
