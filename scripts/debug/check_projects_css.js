const fs = require('fs');

const css = fs.readFileSync('public/_nuxt/shreeyog-projects.css', 'utf8');
const lines = css.split('\n').filter(l => l.includes('request') || l.includes('menu-wrap') || l.includes('places') || l.includes('objects'));
console.log('Matches in shreeyog-projects.css:');
console.log(lines);
