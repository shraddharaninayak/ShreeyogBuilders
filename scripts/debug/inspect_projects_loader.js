const fs = require('fs');

const p = fs.readFileSync('public/projects/index.html', 'utf8');

console.log('--- Checking public/projects/index.html for loader/transition/scroll ---');
console.log('Has page-transition:', p.includes('page-transition'));
console.log('Has sy-loader:', p.includes('sy-loader'));
console.log('Has loader:', p.includes('loader'));
console.log('Has loading:', p.includes('loading'));
console.log('Has -ready:', p.includes('-ready'));
console.log('Has -loaded:', p.includes('-loaded'));
console.log('Has -isolate:', p.includes('-isolate'));
console.log('Has entry:', p.includes('entry'));
console.log('Has nuxt:', p.includes('nuxt'));
