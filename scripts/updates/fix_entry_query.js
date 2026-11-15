const fs = require('fs');
const path = require('path');

function findHtml(dir) {
  let res = [];
  for (let f of fs.readdirSync(dir, { withFileTypes: true })) {
    let p = path.join(dir, f.name);
    if (f.isDirectory()) res.push(...findHtml(p));
    else if (f.name.endsWith('.html')) res.push(p);
  }
  return res;
}

const htmlFiles = findHtml('public');

htmlFiles.forEach(f => {
  let c = fs.readFileSync(f, 'utf8');
  let changed = false;

  if (c.includes('/_nuxt/entry.6ece3b7b.js?v=2.2')) {
    c = c.replace(/\/_nuxt\/entry\.6ece3b7b\.js\?v=2\.2/g, '/_nuxt/entry.6ece3b7b.js');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(f, c, 'utf8');
    console.log('Restored entry.6ece3b7b.js in:', f);
  }
});

console.log('Finished restoring entry.6ece3b7b.js');
