const fs = require('fs');
const js = fs.readFileSync('public/_nuxt/index.d0184b9b.js', 'utf8');

const target1 = '"string-active-step":"places-sequencer[0]"';
const target2 = 'i=A(0),t=[{name:"Living Room"';
const target3 = 'window.innerWidth<1024?f.value=a:f.value=!1';
const target4 = '!1?$("",!0):(g(),Q(E,{key:0,"image-src":tt,options:ie}))';

console.log('Target 1 found:', js.includes(target1));
console.log('Target 2 found:', js.includes(target2));
console.log('Target 3 found:', js.includes(target3));
console.log('Target 4 found:', js.includes(target4));

// Count !1?$("",!0):(g(),Q(T
const countT = (js.match(/!1\?\$\("",!0\):\(g\(\),Q\(T/g) || []).length;
console.log('Count of !1 ? $(... Q(T ...):', countT);
