const fs = require('fs');

console.log('--- FOOTER IN public/index.html ---');
const indexHtml = fs.readFileSync('public/index.html', 'utf8');
const idxFooterStart = indexHtml.indexOf('<footer');
const idxFooterEnd = indexHtml.indexOf('</footer>', idxFooterStart);
if (idxFooterStart !== -1 && idxFooterEnd !== -1) {
  console.log(indexHtml.substring(idxFooterStart, idxFooterEnd + 9));
}

console.log('\n--- FOOTER IN public/projects/index.html ---');
const projHtml = fs.readFileSync('public/projects/index.html', 'utf8');
const pFooterStart = projHtml.indexOf('<footer');
const pFooterEnd = projHtml.indexOf('</footer>', pFooterStart);
if (pFooterStart !== -1 && pFooterEnd !== -1) {
  console.log(projHtml.substring(pFooterStart, pFooterEnd + 9));
}
