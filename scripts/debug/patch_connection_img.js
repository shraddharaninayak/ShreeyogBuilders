const fs = require('fs');

let js = fs.readFileSync('public/_nuxt/index.d0184b9b.js', 'utf8');

if (!js.includes('src:"/images/offices/1.webp"')) {
  console.error('Not found: src:"/images/offices/1.webp"');
  process.exit(1);
}

js = js.replace('src:"/images/offices/1.webp"', 'src:"/images/shreeyog/interiors/living-room.webp"');

fs.writeFileSync('public/_nuxt/index.d0184b9b.js', js, 'utf8');
console.log('Successfully updated connection figure image to Shreeyog living room in public/_nuxt/index.d0184b9b.js!');
