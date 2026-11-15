const fs = require('fs');

// Check the rules affecting menu-icon and text in default.dc95e376.css
const css = fs.readFileSync('public/_nuxt/default.dc95e376.css', 'utf8');

const rules = [
  'header .-w .menu-wrap[data-v-81ce8483]',
  'header .-w .menu-wrap[data-v-81ce8483] .button',
  'header .-w .menu-wrap[data-v-81ce8483] .button>*',
  'header .-w .menu-wrap[data-v-81ce8483] .button .menu-icon',
  'header .-w .menu-wrap[data-v-81ce8483] .button .text',
  'header.-scrolled .-w .menu-wrap[data-v-81ce8483] .button .menu-icon',
  'header.-scrolled .-w .menu-wrap[data-v-81ce8483] .button .text'
];

rules.forEach(r => {
  const idx = css.indexOf(r);
  if (idx !== -1) {
    const end = css.indexOf('}', idx);
    console.log(css.slice(idx, end + 1));
  }
});
