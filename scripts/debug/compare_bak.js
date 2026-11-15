const fs = require('fs');

const bakHtml = fs.readFileSync('public/index.html.bak', 'utf-8');
const curHtml = fs.readFileSync('public/index.html', 'utf-8');

console.log('bakHtml has shreeyog-hero-custom?', bakHtml.includes('shreeyog-hero-custom'));
console.log('bakHtml length:', bakHtml.length);
console.log('curHtml length:', curHtml.length);
