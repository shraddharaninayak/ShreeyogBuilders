const fs = require('fs');
const path = require('path');

const files = [
  'index.html',
  '_nuxt/index.a596e4a8.css',
  '_nuxt/index.d0184b9b.js',
  '_nuxt/entry.6ece3b7b.js',
  '_nuxt/default.dc95e376.css',
  '_nuxt/default.ea02c3da.js',
  '_nuxt/BaseImage.19cf9bf9.js',
  '_nuxt/BaseImage.db5c7078.css'
];

const origBase = 'references/obsidian_original/obsidianassembly.com';
const currentBase = 'public';

console.log('=== DEEP FORENSIC COMPARISON ===\n');

for (const rel of files) {
  const origPath = path.join(origBase, rel);
  const curPath = path.join(currentBase, rel);
  const bakPath = path.join(currentBase, rel + '.bak');

  const origExists = fs.existsSync(origPath);
  const curExists = fs.existsSync(curPath);
  const bakExists = fs.existsSync(bakPath);

  console.log(`--- FILE: ${rel} ---`);
  console.log(`  Orig exists: ${origExists} (${origExists ? fs.statSync(origPath).size : 0} bytes)`);
  console.log(`  Cur exists:  ${curExists} (${curExists ? fs.statSync(curPath).size : 0} bytes)`);
  console.log(`  Bak exists:  ${bakExists} (${bakExists ? fs.statSync(bakPath).size : 0} bytes)`);

  if (origExists && curExists) {
    const origBuf = fs.readFileSync(origPath);
    const curBuf = fs.readFileSync(curPath);
    if (origBuf.equals(curBuf)) {
      console.log('  STATUS: EXACT MATCH WITH ORIGINAL (0 bytes difference)');
    } else {
      console.log(`  STATUS: MODIFIED (Orig: ${origBuf.length}, Cur: ${curBuf.length}, Delta: ${curBuf.length - origBuf.length})`);
    }
  }
}
