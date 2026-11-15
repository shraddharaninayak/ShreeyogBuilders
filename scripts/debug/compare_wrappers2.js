const fs = require('fs');
const orig = fs.readFileSync('scripts/debug/orig_objects.html', 'utf8');
const curr = fs.readFileSync('scripts/debug/curr_objects.html', 'utf8');

function getObjectWrappers(html) {
  const re = /<div [^>]*class="[^"]*object-wrapper[^"]*"[^>]*>/g;
  let m;
  const list = [];
  while ((m = re.exec(html)) !== null) {
    list.push(m[0]);
  }
  return list;
}

console.log('Orig:', getObjectWrappers(orig));
console.log('Curr:', getObjectWrappers(curr));
