const fs = require('fs');

const js = fs.readFileSync('d:/Shreeyogweb/public/_nuxt/places.b37ae0d8.js', 'utf8');

const eaIdx = js.indexOf('ea=');
console.log('ea= idx:', eaIdx);
if (eaIdx !== -1) {
  console.log(js.substring(eaIdx - 50, eaIdx + 200));
} else {
  // search for imports from vue
  const vIdx = js.indexOf('createStaticVNode');
  console.log('createStaticVNode idx:', vIdx);
}
