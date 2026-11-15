const fs = require('fs');

const html = fs.readFileSync('scripts/debug/chrome_dom.html', 'utf8');

const sIdx = html.indexOf('class="c-objects"');
const eIdx = html.indexOf('class="s-wrapper"', sIdx);
const section = html.slice(sIdx, eIdx);

console.log('c-objects section length:', section.length);

const holders = section.match(/<div [^>]*class="[^"]*object-holder[^"]*"[^>]*>[\s\S]*?<\/figure><\/div>/g) || [];
console.log('Holders count:', holders.length);

holders.forEach((h, i) => {
  console.log(`\n--- Holder ${i} ---`);
  console.log(h);
});
