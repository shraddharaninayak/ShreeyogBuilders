const fs = require('fs');
const glob = require('fs').readdirSync('d:/Shreeyogweb/public/_nuxt');
const cssFiles = glob.filter(f => f.endsWith('.css'));
console.log('CSS files:', cssFiles);

for (const f of cssFiles) {
  const content = fs.readFileSync('d:/Shreeyogweb/public/_nuxt/' + f, 'utf8');
  const idx = content.indexOf('c-places');
  if (idx !== -1) {
    console.log(`Found c-places in ${f}:`);
    console.log(content.substring(idx - 100, idx + 1200));
  }
}
