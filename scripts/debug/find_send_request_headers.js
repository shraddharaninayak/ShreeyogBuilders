const fs = require('fs');

function findHtmlFiles(dir) {
  let res = [];
  fs.readdirSync(dir, { withFileTypes: true }).forEach(d => {
    const full = dir + '/' + d.name;
    if (d.isDirectory()) {
      if (d.name !== 'node_modules' && d.name !== '.git') res = res.concat(findHtmlFiles(full));
    } else if (d.name.endsWith('.html')) {
      res.push(full);
    }
  });
  return res;
}

const allHtml = findHtmlFiles('.');
const headerFiles = [];
allHtml.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  if (content.includes('send request') && content.includes('<header')) {
    headerFiles.push(f);
  }
});

console.log('HTML files with "send request" in header:', headerFiles.length);
headerFiles.forEach(f => console.log(f));
