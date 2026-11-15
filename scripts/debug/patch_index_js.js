const fs = require('fs');

let js = fs.readFileSync('public/_nuxt/index.d0184b9b.js', 'utf8');

// Backup original before modifying
fs.writeFileSync('public/_nuxt/index.d0184b9b.js.bak', js, 'utf8');

// 1. places-sequencer[0] -> places-sequencer[3]
if (!js.includes('"string-active-step":"places-sequencer[0]"')) {
  console.error('Failed to find places-sequencer[0]');
  process.exit(1);
}
js = js.replace('"string-active-step":"places-sequencer[0]"', '"string-active-step":"places-sequencer[3]"');

// 2. i=A(0) -> i=A(3)
if (!js.includes('i=A(0),t=[{name:"Living Room"')) {
  console.error('Failed to find i=A(0)');
  process.exit(1);
}
js = js.replace('i=A(0),t=[{name:"Living Room"', 'i=A(3),t=[{name:"Living Room"');

// 3. window.innerWidth<1024?f.value=a:f.value=!1 -> f.value=a
if (!js.includes('p=a=>{window.innerWidth<1024?f.value=a:f.value=!1}')) {
  console.error('Failed to find window.innerWidth<1024');
  process.exit(1);
}
js = js.replace('p=a=>{window.innerWidth<1024?f.value=a:f.value=!1}', 'p=a=>{f.value=a}');

// 4. Restore f.value on E WebGL canvas
if (!js.includes('!1?$("",!0):(g(),Q(E,{key:0,"image-src":tt,options:ie}))')) {
  console.error('Failed to find E WebGL canvas');
  process.exit(1);
}
js = js.replace('!1?$("",!0):(g(),Q(E,{key:0,"image-src":tt,options:ie}))', 'f.value?$("",!0):(g(),Q(E,{key:0,"image-src":tt,options:ie}))');

// 5. Restore f.value on the 6 image slots
const beforeCount = (js.match(/!1\?\$\("",!0\):\(g\(\),Q\(T/g) || []).length;
console.log('Replacing', beforeCount, 'image slots...');
js = js.replaceAll('!1?$("",!0):(g(),Q(T', 'f.value?$("",!0):(g(),Q(T');

fs.writeFileSync('public/_nuxt/index.d0184b9b.js', js, 'utf8');
console.log('Successfully updated public/_nuxt/index.d0184b9b.js!');
