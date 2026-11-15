const fs = require('fs');
const css1 = fs.readFileSync('d:/Shreeyogweb/public/_nuxt/places.a8fd09d3.css', 'utf8');
console.log('places.a8fd09d3.css length:', css1.length);
console.log('places.a8fd09d3.css content:\n', css1.substring(0, 2000));
