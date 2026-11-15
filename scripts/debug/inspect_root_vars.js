const fs = require('fs');

const css = fs.readFileSync('d:/Shreeyogweb/public/_nuxt/default.dc95e376.css', 'utf8');

const rootIdx = css.indexOf(':root');
if (rootIdx !== -1) {
  console.log(':root variables:\n', css.substring(rootIdx, rootIdx + 1200));
}
