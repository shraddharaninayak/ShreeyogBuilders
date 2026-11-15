const fs = require('fs');

function findReferences(dir) {
  let res = [];
  fs.readdirSync(dir, { withFileTypes: true }).forEach(d => {
    const full = dir + '/' + d.name;
    if (d.isDirectory()) {
      if (d.name !== 'node_modules' && d.name !== '.git') res = res.concat(findReferences(full));
    } else if (d.name.includes('menu') || d.name.endsWith('.mp4') || d.name.endsWith('.jpg') || d.name.endsWith('.png')) {
      res.push(full);
    }
  });
  return res;
}

console.log('Media and reference files:');
console.log(findReferences('.').filter(f => f.includes('ref') || f.includes('menu') || f.includes('obsidian')));
