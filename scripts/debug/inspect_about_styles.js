const fs = require('fs');

const html = fs.readFileSync('public/about/index.html', 'utf8');

let pos = 0;
let styleCount = 0;
while ((pos = html.indexOf('<style', pos)) !== -1) {
  const end = html.indexOf('</style>', pos);
  styleCount++;
  console.log(`=== Style block ${styleCount} (length ${end - pos}) ===`);
  console.log(html.slice(pos, Math.min(end + 8, pos + 500)));
  pos = end + 8;
}
