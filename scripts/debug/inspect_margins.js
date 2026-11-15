const fs = require('fs');
const c = fs.readFileSync('public/index.html', 'utf8');

['c-objects', 'sticky-container-2', 'connection-figure', 'c-connection'].forEach(name => {
  let idx = 0;
  while ((idx = c.indexOf(name, idx)) !== -1) {
    const chunk = c.substring(idx - 40, idx + 120);
    if (chunk.includes('margin') || chunk.includes('padding') || chunk.includes('height')) {
      console.log(name, ':', chunk);
    }
    idx += name.length;
  }
});
