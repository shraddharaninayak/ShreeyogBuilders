const fs = require('fs');

const css = fs.readFileSync('public/_nuxt/default.dc95e376.css', 'utf8');

const matches = css.match(/[^{}]*(?:-ready|-loaded|-isolate|scroll|overflow|opacity|visibility|transition)[^{}]*\{[^}]*\}/g);
if (matches) {
  const interesting = matches.filter(m => m.includes('-ready') || m.includes('-loaded') || m.includes('overflow') || m.includes('-isolate'));
  console.log('Interesting rules in default.dc95e376.css:');
  interesting.forEach(m => console.log(' ->', m));
}
