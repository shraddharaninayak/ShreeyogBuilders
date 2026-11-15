const fs = require('fs');
const path = require('path');

const filesToCompare = [
  'index.html',
  '_nuxt/index.d0184b9b.js',
  '_nuxt/index.a596e4a8.css',
  '_nuxt/entry.6ece3b7b.js',
  '_nuxt/default.ea02c3da.js',
  '_nuxt/default.dc95e376.css'
];

filesToCompare.forEach(rel => {
  const pOrig = path.join('references/obsidian_original/obsidianassembly.com', rel);
  const pPub = path.join('public', rel);
  if (!fs.existsSync(pOrig) || !fs.existsSync(pPub)) {
    console.log('Missing file for', rel);
    return;
  }
  const sOrig = fs.statSync(pOrig).size;
  const sPub = fs.statSync(pPub).size;
  console.log(`=== ${rel} ===`);
  console.log(`Size: Orig=${sOrig}, Pub=${sPub}, Diff=${sPub - sOrig}`);
});
