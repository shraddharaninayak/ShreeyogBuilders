const fs = require('fs');

const cur = fs.readFileSync('public/index.html', 'utf8');
const bak = fs.readFileSync('public/index.html.bak', 'utf8');

console.log('Cur length:', cur.length);
console.log('Bak length:', bak.length);

// What is in bak that is not in cur, or in cur that is not in bak?
const curScripts = cur.match(/<script[^>]*>[\s\S]*?<\/script>/gi) || [];
const bakScripts = bak.match(/<script[^>]*>[\s\S]*?<\/script>/gi) || [];

console.log('Cur script count:', curScripts.length);
console.log('Bak script count:', bakScripts.length);

for (const bs of bakScripts) {
  const id = (bs.match(/id="([^"]*)"/) || [])[1];
  const src = (bs.match(/src="([^"]*)"/) || [])[1];
  console.log('Bak script:', id || src || bs.slice(0, 40));
}
