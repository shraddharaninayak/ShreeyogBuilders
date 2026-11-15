// Let's inspect BaseImage and how it's called
const fs = require('fs');
const js = fs.readFileSync('public/_nuxt/index.d0184b9b.js', 'utf8');

const baseImg = fs.readFileSync('public/_nuxt/BaseImage.19cf9bf9.js', 'utf8');

console.log('BaseImage props definition:');
console.log(baseImg.slice(baseImg.indexOf('props:{'), baseImg.indexOf('setup(e)')));
