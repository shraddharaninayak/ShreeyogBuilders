const fs = require('fs');
const path = require('path');

function searchAll(dir, target) {
  let list = [];
  for (let f of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, f.name);
    if (f.isDirectory()) {
      if (!['node_modules', '.git'].includes(f.name)) list = list.concat(searchAll(p, target));
    } else if (/\.(html|js)$/i.test(f.name)) {
      if (fs.readFileSync(p, 'utf8').includes(target)) list.push(p);
    }
  }
  return list;
}

console.log('Files with href="/people":', searchAll('public', 'href="/people"'));
console.log('Files with "/people" in _nuxt:', searchAll('public/_nuxt', '/people'));
