const fs = require('fs');
const c = fs.readFileSync('public/index.html', 'utf8');

const seqIdx = c.indexOf('class="sequence');
if (seqIdx !== -1) {
  const nextSection = c.indexOf('class="sticky-container-1"', seqIdx);
  console.log('--- sequence block in public/index.html ---');
  console.log(c.substring(seqIdx - 30, nextSection));
}
