const fs = require('fs');

const js = fs.readFileSync('obsidianassembly.com/_nuxt/index.d0184b9b.js', 'utf8');

const setupIdx = js.indexOf('f=A(!1),p=a=>{f.value=a}');
console.log('setupIdx:', setupIdx);

const matches = [];
let idx = 0;
while ((idx = js.indexOf('f.value?$("",!0):', idx)) !== -1) {
  matches.push(idx);
  idx += 15;
}
console.log('f.value matches:', matches);
