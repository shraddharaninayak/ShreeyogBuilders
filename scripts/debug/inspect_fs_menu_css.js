const fs = require('fs');

const css = fs.readFileSync('public/_nuxt/default.dc95e376.css', 'utf8');

const regex = /\.full-screen-menu[^{}]*\{[^{}]*\}/g;
let m;
while ((m = regex.exec(css)) !== null) {
  console.log(m[0]);
}

// Also check .close and .button-close
const closeRegex = /\.(close|button-close)[^{}]*\{[^{}]*\}/g;
let m2;
while ((m2 = closeRegex.exec(css)) !== null) {
  console.log(m2[0]);
}
