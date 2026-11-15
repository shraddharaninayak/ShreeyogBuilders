const fs = require('fs');
const js = fs.readFileSync('public/_nuxt/index.d0184b9b.js', 'utf8');
console.log('Contains places-sequencer[3]:', js.includes('"string-active-step":"places-sequencer[3]"'));
console.log('Contains i=A(3):', js.includes('i=A(3),t=[{name:"Living Room"'));
console.log('Contains p=a=>{f.value=a}:', js.includes('p=a=>{f.value=a}'));
console.log('Contains f.value on E:', js.includes('f.value?$("",!0):(g(),Q(E,{key:0,"image-src":tt,options:ie}))'));
console.log('Remaining !1?$(: ', (js.match(/!1\?\$\("",!0\):\(g\(\),Q/g) || []).length);
