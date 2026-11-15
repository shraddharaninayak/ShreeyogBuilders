const fs = require('fs');

const css = fs.readFileSync('public/_nuxt/default.dc95e376.css', 'utf8');

// Let's check the bottom of default.dc95e376.css where overrides were added
const marker = '/* ==========================================================================\n   NAVIGATION & SCROLL RESILIENCY OVERRIDES';
const idx = css.indexOf(marker);
console.log('Original css length before marker:', idx);
console.log('Overrides length:', css.length - idx);

// Let's inspect everything added after marker
console.log('Added overrides:\n', css.slice(idx));
