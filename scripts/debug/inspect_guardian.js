const fs = require('fs');
const html = fs.readFileSync('public/index.html', 'utf8');

const s5 = html.match(/<script id="shreeyog-homepage-guardian"[\s\S]*?<\/script>/i);
if (s5) {
  console.log('shreeyog-homepage-guardian length:', s5[0].length);
  console.log(s5[0]);
}

const css = html.match(/<style id="shreeyog-homepage-flow-css"[\s\S]*?<\/style>/i);
if (css) {
  console.log('shreeyog-homepage-flow-css length:', css[0].length);
  console.log(css[0]);
}
