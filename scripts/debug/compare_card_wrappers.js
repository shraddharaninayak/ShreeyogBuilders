const fs = require('fs');
const orig = fs.readFileSync('scripts/debug/orig_objects.html', 'utf8');
const curr = fs.readFileSync('scripts/debug/curr_objects.html', 'utf8');

function getWrappers(html) {
  const wrappers = [];
  const re = /<div style="--order:(\d);--sequence-order:(-?\d);"[^>]*>[\s\S]*?<\/figure><\/div><\/div><\/div>/g;
  let m;
  while ((m = re.exec(html)) !== null) {
    wrappers.push(m[0]);
  }
  return wrappers;
}

const origW = getWrappers(orig);
const currW = getWrappers(curr);
console.log('Orig wrappers count:', origW.length);
console.log('Curr wrappers count:', currW.length);

origW.forEach((w, i) => {
  console.log(`\n--- Wrapper ${i} ---`);
  console.log('ORIG:', w.slice(0, 250));
  console.log('CURR:', currW[i] ? currW[i].slice(0, 250) : 'none');
});
