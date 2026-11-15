const fs = require('fs');

const jsPath = 'obsidianassembly.com/_nuxt/index.d0184b9b.js';
let js = fs.readFileSync(jsPath, 'utf8');

// 1. Update p handler so f.value is never forced true on desktop
const oldSetup = 'f=A(!1),p=a=>{f.value=a}';
const newSetup = 'f=A(!1),p=a=>{window.innerWidth<1024?f.value=a:f.value=!1}';

if (js.includes(oldSetup)) {
  js = js.replace(oldSetup, newSetup);
  console.log('✓ Updated setup p handler in JS');
} else {
  console.warn('Warning: oldSetup not found');
}

// 2. For the 6 outer gallery figures (keys 0 to 5), replace f.value?$("",!0): with !1?$("",!0):
for (let k = 0; k <= 5; k++) {
  const oldFig = `f.value?$("",!0):(g(),Q(T,{key:${k},decoding:"async",fit:"",class:"i i-${k+1}"`;
  const newFig = `!1?$("",!0):(g(),Q(T,{key:${k},decoding:"async",fit:"",class:"i i-${k+1}"`;
  if (js.includes(oldFig)) {
    js = js.replace(oldFig, newFig);
    console.log(`✓ Replaced condition for figure i-${k+1}`);
  } else {
    console.warn(`Warning: figure i-${k+1} condition not found`);
  }
}

// Also for WebGL canvas in gl (key:0 in Q(E))
const oldGl = 'f.value?$("",!0):(g(),Q(E,{key:0,"image-src":tt,options:ie}))';
const newGl = '!1?$("",!0):(g(),Q(E,{key:0,"image-src":tt,options:ie}))';
if (js.includes(oldGl)) {
  js = js.replace(oldGl, newGl);
  console.log('✓ Replaced condition for WebGL canvas in gl');
}

fs.writeFileSync(jsPath, js, 'utf8');
console.log('Saved updated index.d0184b9b.js');
