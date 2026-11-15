const fs = require('fs');

const p = fs.readFileSync('public/projects/index.html', 'utf8');

const featStart = p.indexOf('<section class="c-projects-featured"');
const featEnd = p.indexOf('</section>', featStart);
if (featStart !== -1 && featEnd !== -1) {
  console.log('Highlighted Projects Section HTML:');
  console.log(p.substring(featStart, featEnd + 10));
}
