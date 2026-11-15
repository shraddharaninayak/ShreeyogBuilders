const fs = require('fs');
const orig = fs.readFileSync('references/obsidian_original/obsidianassembly.com/index.html', 'utf8');

const sIdx = orig.indexOf('c-objects');
const eIdx = orig.indexOf('c-connection', sIdx);
const section = orig.slice(sIdx, eIdx);

const holders = section.match(/<div class="object-holder"[\s\S]*?<\/div>/g) || [];
console.log('Holders count:', holders.length);
holders.forEach((h, i) => {
  console.log(`\n--- Holder ${i} ---`);
  console.log(h.slice(0, 300));
});
